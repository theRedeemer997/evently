//get the environment variables from the .env file
require('dotenv').config();
// imports the express library
const express = require('express');
//imports the body-parser middleware which
const bodyParser = require('body-parser');
// import the express-session library
const session = require('express-session');
const MongoStore = require('connect-mongo');
//imports the Node.js path
const path = require('path');
//initialize the express app
const evently = express();
// get the port from the environment variables
const port = process.env.PORT || 3000;
evently.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.mongoUri, // MongoDB connection string
            ttl: 14 * 24 * 60 * 60, // 14 days
        }),
    })
);
/*
 * Get all the controllers
 */
const getHomePage = require('./controllers/getHomePage');
const getSignUp = require('./controllers/getSignUp');
const postRegister = require('./controllers/registerUser');
const getLoginPage = require('./controllers/getLoginPage');
const handleLogin = require('./controllers/handleLogin');
const handleLogout = require('./controllers/handleLogout');
const getEventBookingPage = require('./controllers/getEventBookingPage');
const handleCreateEventAction = require('./controllers/handleCreateEventAction');
const getManageEventPage = require('./controllers/getManageEventPage');
const handleEventsApproval = require('./controllers/handleEventsApproval');
const handleEventsRejection = require('./controllers/handleEventsRejection');
//connect the db
const DB = require('./connectDB');
DB();
// Setting up multer as a middleware to grab photo uploads
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

//middleware
evently.use(bodyParser.urlencoded({ extended: true }));
//integrate the public directory
evently.use(express.static(path.join(__dirname, 'public')));
//integrate the views directory
evently.set('views', __dirname + '/views');
//set the ejs engine
evently.set('view engine', 'ejs');

//render the home page
evently.get('/', getHomePage);
//render the sign up page
evently.get('/register', getSignUp);
//post call for user registration page
evently.post('/register', postRegister);
//render the login page
evently.get('/login', getLoginPage);
//post call for login
evently.post('/login', handleLogin);
//get call to get the booking form
evently.get('/createEvent', getEventBookingPage);
//post call to handle the event booking
evently.post(
    '/createEvent',
    upload.single('eventImage'),
    handleCreateEventAction
);
//get call to list the events in the admin panel
evently.get('/manageEvent', getManageEventPage);
// call to approve the event by admin
evently.get('/approve/:eventId', handleEventsApproval);
// call to reject the event by admin
evently.get('/reject/:eventId', handleEventsRejection);
//get call for logout
evently.get('/logout', handleLogout);

evently.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
