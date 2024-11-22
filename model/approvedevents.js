//import the mongoose package
const mongoose = require('mongoose');
//get the Schema from mongoose
const { Schema } = mongoose;
//Define the schema for user
const approvedEventsSchema = new Schema({
    OrganizerName: String,
    OrganizerEmail: String,
    EventName: String,
    SlotsAvailable: String,
    Price: String,
    Description: String,
    Address: String,
    ImageUrl: String,
    FileName: String,
    Ratings: [
        {
            RatingId: {
                type: Schema.Types.ObjectId,
                ref: 'rating', // Reference to the rating schema
            },
            EventName: {
                type: String,
            },
            Rating: {
                type: Number,
                required: true,
            },
            Feedback: {
                type: String,
                maxlength: 500,
            },
            Date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
});
module.exports = mongoose.model('approvedevents', approvedEventsSchema);
