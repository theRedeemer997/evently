//require("dotenv").config();
const { initializeApp } = require('firebase/app');
const {
    getStorage,
    ref,
    getDownloadURL,
    uploadBytesResumable,
} = require('firebase/storage');
// get the firebase config
const config = require('../config/firebaseConfig');

const createdEvent = require('../model/createdevents');
const constants = require('../constants');

//Initialize a firebase application
const app = initializeApp(config);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

const handleCreateEventAction = async (req, res) => {
    //get the required fields from the body and the file
    const {
        organizername,
        slotsavailable,
        price,
        description,
        eventaddress,
        eventname,
    } = req.body;

    const { originalname, mimetype, buffer } = req.file;

    const storageRef = ref(storage, 'images/' + originalname);
    const metadata = {
        contentType: mimetype,
    };
    const snapshot = await uploadBytesResumable(storageRef, buffer, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log(
        '🚀 ~ CreateEventAction ~ action:',
        'Image Uploaded Successfully to Firebase'
    );
    console.log('🚀 ~ AddPostPage ~ downloadURL:', downloadURL);
    let eventCreated = new createdEvent({
        OrganizerName: organizername,
        EventName: eventname,
        SlotsAvailable: slotsavailable,
        Price: price,
        Description: description,
        Address: eventaddress,
        ImageUrl: downloadURL,
        FileName: originalname,
    });
    await eventCreated.save();
    let salutation = 'Hi ' + organizername + '!!';
    let notification = constants.EVENT_BOOKING_ALERT;
    res.render('home', {
        salutation,
        notification,
        loggedIn: constants.LOGGED_IN,
    });
};

module.exports = handleCreateEventAction;
