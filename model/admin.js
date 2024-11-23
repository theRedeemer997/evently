//import the mongoose package
const mongoose = require('mongoose');
//get the Schema from mongoose
const { Schema } = mongoose;
//Define the schema for user
const adminSchema = new Schema({
    OrganizerName: {
        type: String,
        required: [true, 'Organizer Name is required'],
        trim: true,
        maxLength: 60,
    },
    EventName: {
        type: String,
        required: [true, 'Event Name is required'],
        trim: true,
        maxLength: 60,
    },
    Address: {
        type: String,
        required: [true, 'Address is required'],
        trim: true,
        maxLength: 300,
    },
    EventDateTime: {
        type: Date,
        required: true,
    },
    Action: {
        type: String,
    },
});

module.exports = mongoose.model('admin', adminSchema);
