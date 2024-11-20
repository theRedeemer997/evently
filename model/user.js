//import the mongoose package
const mongoose = require('mongoose');
//get the Schema from mongoose
const { Schema } = mongoose;
//Define the schema for user
const userSchema = new Schema({
    EmailAddress: {
        type: String,
        required: [true, 'EmailAddress is required'],
        unique: true,
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
    BookedEvents: [
        {
            EventId: {
                type: Schema.Types.ObjectId,
                ref: 'approvedevents', // Reference to the approvedevents schema
            },
            EventName: {
                type: String,
            },
            Tickets: {
                type: String,
            },
            FinalPrice: {
                type: String,
            },
        },

        // EventName: evt.EventName,
        // Tickets: tickets,
    ],
});
module.exports = mongoose.model('user', userSchema);
