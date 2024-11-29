const sendMail = require('../services/sendMail');
const createdevents = require('../model/createdevents');
const rejectedEvent = require('../model/rejectedevents');
const handleDeleteImage = require('../services/handleDeleteImage');
const constants = require('../constants');
const admin = require('../model/admin');
const generateDynamicMessage = require('../services/generateDynamicMessage');
const handleEventsRejection = async (req, res) => {
    try {
        const { eventId } = req.params;
        console.log('🚀 ~ handleEventsRejection ~ event id:', eventId);
        const event = await createdevents.findById(eventId);
        console.log('🚀 ~ handleEventsRejection ~ event found:', event);
        const rejectedEvents = new rejectedEvent({
            OrganizerName: event.OrganizerName,
            EventName: event.EventName,
            SlotsAvailable: event.SlotsAvailable,
            Price: event.Price,
            Description: event.Description,
            Address: event.Address,
            ImageUrl: event.ImageUrl,
            FileName: event.FileName,
        });
        const adm = new admin({
            OrganizerName: event.OrganizerName,
            EventName: event.EventName,
            Address: event.Address,
            EventDateTime: event.EventDateTime,
            Action: 'Rejected',
        });
        //save the event into approved events collection
        await rejectedEvents.save();
        await adm.save();
        //delete the image from firebase
        handleDeleteImage(event.FileName, event.OrganizerName, event.EventName);
        await sendMail(
            event.OrganizerEmail,
            generateDynamicMessage(
                constants.REJ_SUB,
                '${eventName}',
                event.EventName
            ),
            constants.REJ_MSG
        );
        //delete the same events from created events collection
        await createdevents.findByIdAndDelete(eventId);
        req.flash('loggedIn', constants.LOGGED_IN);
        req.flash('isAdmin', constants.ADMIN);
        res.redirect('/');
        // res.render('home', {
        //     loggedIn: constants.LOGGED_IN,
        //     isAdmin: constants.ADMIN,
        // });
    } catch (error) {
        console.log('🚀 ~ handleEventsApproval ~ error:', error.message);
    }
};

module.exports = handleEventsRejection;
