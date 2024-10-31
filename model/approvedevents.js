//import the mongoose package
const mongoose = require('mongoose');
//get the Schema from mongoose
const { Schema } = mongoose;
//Define the schema for user
const approvedEventsSchema = new Schema({
    OrganizerName: String,
    EventName: String,
    SlotsAvailable: String,
    Price: String,
    Description: String,
    Address: String,
    ImageUrl: String,
    FileName: String,
});
module.exports = mongoose.model('approvedevents', approvedEventsSchema);
