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
 * Get all the routes
 */
const getHomePage = require('./routes/getHomePage');
const getSignUp = require('./routes/getSignUp');
const postRegister = require('./routes/registerUser');
const getLoginPage = require('./routes/getLoginPage');
const handleLogin = require('./routes/handleLogin');
const handleLogout = require('./routes/handleLogout');
//connect the db
const DB = require('./connectDB');
DB();

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
//get call for logout
evently.get('/logout', handleLogout);

evently.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
