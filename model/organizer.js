//import the mongoose package
const mongoose = require('mongoose');
//get the Schema from mongoose
const { Schema } = mongoose;
//Define the schema for user
const organizerSchema = new Schema({
    EmailAddress: String,
    FirstName: String,
    LastName: String,
    Password: String,
    OrganizerName: String,
});
module.exports = mongoose.model('organizers', organizerSchema);
