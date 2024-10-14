//import the mongoose package
const mongoose = require("mongoose");
//get the user collection
const user = require("./model/user");
//get the organizer collection
const organizer = require("./model/organizer");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.mongoUri);
    await user.createCollection();
    await organizer.createCollection();
    console.log("collections are created..");
    console.log("DB connected successfully on host ", conn.connection.host);
  } catch (error) {
    console.log("Connection failed", error.message);
  }
};

module.exports = connectDB;