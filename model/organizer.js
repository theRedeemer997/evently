//import the mongoose package
const mongoose = require('mongoose');
//get the Schema from mongoose
const { Schema } = mongoose;
//Define the schema for user
const organizerSchema = new Schema({
    EmailAddress: {
        type: String,
        required: [true, 'EmailAddress is required'],
        unique: false,
        trim: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        maxlength: 60,
    },
    FirstName: {
        type: String,
        required: [true, 'FirstName is required'],
        trim: true,
        maxLength: 60,
    },
    LastName: {
        type: String,
        required: [true, 'LastName is required'],
        trim: true,
        maxLength: 60,
    },
    Password: {
        type: String,
    },
    OrganizerName: {
        type: String,
        required: [true, 'Organizer Name is required'],
        trim: true,
        maxLength: 60,
    },
});
module.exports = mongoose.model('organizers', organizerSchema);
