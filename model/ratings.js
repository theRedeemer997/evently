//import the mongoose package
const mongoose = require('mongoose');
//get the Schema from mongoose
const { Schema } = mongoose;
//Define the schema for user
const ratingsSchema = new Schema({
    UserId: {
        type: Schema.Types.ObjectId,
        ref: 'user', // Reference to the user schema
        required: true,
    },
    EventId: {
        type: Schema.Types.ObjectId,
        ref: 'approvedevents', // Reference to the approvedevents schema
        required: true,
    },
    Rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    Feedback: {
        type: String,
        maxlength: 500,
    },
    Date: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model('ratings', ratingsSchema);
