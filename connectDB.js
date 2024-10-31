//import the mongoose package
const mongoose = require('mongoose');
//get the user collection
const user = require('./model/user');
//get the organizer collection
const organizer = require('./model/organizer');
//get the createdEvents collection
const createdEvents = require('./model/createdevents');
//get the approvedEvents collection
const approvedEvents = require('./model/approvedevents');
//ge the rejected events collection
const rejectedEvents = require('./model/rejectedevents');
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.mongoUri);
        await user.createCollection();
        await organizer.createCollection();
        await createdEvents.createCollection();
        console.log('collections are created..');
        console.log('DB connected successfully on host ', conn.connection.host);
    } catch (error) {
        console.log('Connection failed', error.message);
    }
};

module.exports = connectDB;
