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
const handleDeleteImage = require('../services/handleDeleteImage');

//Initialize a firebase application
const app = initializeApp(config);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

const handleCreateEventAction = async (req, res) => {
    //get the required fields from the body and the file
    const {
        organizername,
        organizeremail,
        slotsavailable,
        price,
        description,
        eventaddress,
        eventname,
        eventdatetime,
    } = req.body;

    try {
        let eventDT = new Date(eventdatetime);
        if (req.file === undefined) {
            let err = 'Please upload the image';
            res.render('createvent', {
                err,
                organizername,
                organizeremail,
                slotsavailable,
                price,
                description,
                eventaddress,
                eventname,
                eventdatetime,
            });
        } else {
            const { originalname, mimetype, buffer } = req.file;
            const storageRef = ref(
                storage,
                'images/' + originalname + organizername + eventname
            );
            const metadata = {
                contentType: mimetype,
            };

            const snapshot = await uploadBytesResumable(
                storageRef,
                buffer,
                metadata
            );
            const downloadURL = await getDownloadURL(snapshot.ref);
            console.log(
                '🚀 ~ CreateEventAction ~ action:',
                'Image Uploaded Successfully to Firebase'
            );
            console.log('🚀 ~ AddPostPage ~ downloadURL:', downloadURL);

            let eventCreated = new createdEvent({
                OrganizerName: organizername,
                OrganizerEmail: organizeremail,
                EventName: eventname,
                SlotsAvailable: slotsavailable,
                Price: price,
                Description: description,
                Address: eventaddress,
                ImageUrl: downloadURL,
                FileName: originalname,
                EventDateTime: eventdatetime,
            });
            await eventCreated.save();

            let salutation = 'Hi ' + organizername + '!!';
            let notification = constants.EVENT_BOOKING_ALERT;
            res.render('home', {
                salutation,
                notification,
                loggedIn: constants.LOGGED_IN,
            });
        }
    } catch (error) {
        console.log('🚀 ~ handleCreateEventAction ~ error:', error);
        await handleDeleteImage(
            req.file.originalname,
            req.body.organizername,
            req.body.eventname
        );
        if (error.name === 'ValidationError') {
            console.log('🚀 ~ handleCreateEventAction ~ error:', error);
            const errorMessages = Object.values(error.errors).map(
                (err) => err.message
            );
            console.log(
                '🚀 ~ handleCreateEventAction ~ errorMessage:',
                errorMessages,
                errorMessages.length
            );
            res.render('createvent', {
                error: errorMessages,
                organizername,
                organizeremail,
                slotsavailable,
                price,
                description,
                eventaddress,
                eventname,
                eventdatetime,
            });
        }
    }
};

module.exports = handleCreateEventAction;
