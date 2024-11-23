//import the mongoose package
const mongoose = require('mongoose');
//get the Schema from mongoose
const { Schema } = mongoose;
//Define the schema for user
const createdEventsSchema = new Schema({
    OrganizerName: {
        type: String,
        required: [true, 'Organizer Name is required'],
        trim: true,
        maxLength: 60,
    },
    OrganizerEmail: {
        type: String,
        required: [true, 'Organizer Email is required'],
        trim: true,
        maxLength: 60,
    },
    EventName: {
        type: String,
        required: [true, 'Event Name is required'],
        trim: true,
        maxLength: 60,
    },
    SlotsAvailable: {
        type: String,
        required: [true, 'Slots Available is required'],
        trim: true,
        maxLength: 20,
    },
    Price: {
        type: String,
        required: [true, 'Event Price is required'],
        trim: true,
        maxLength: 20,
    },
    Description: {
        type: String,
        required: [true, 'Event Description is required'],
        trim: true,
        minLength: [
            300,
            'The Event Description cannot be less than 300 charaters',
        ],
        maxLength: [
            600,
            'The Event Description cannot be more than 600 charaters',
        ],
    },
    Address: {
        type: String,
        required: [true, 'Address is required'],
        trim: true,
        maxLength: 300,
    },
    ImageUrl: String,
    FileName: String,
    EventDateTime: {
        type: Date,
        required: true,
    },
});

// Set the TTL index for the `EventDateTime` field (e.g., 0 means the document will be removed when the date and time passes)
createdEventsSchema.index({ EventDateTime: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('createdevents', createdEventsSchema);
