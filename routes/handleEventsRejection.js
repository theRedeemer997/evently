const createdevents = require('../model/createdevents');
const rejectedEvent = require('../model/rejectedevents');
const handleDeleteImage = require('../services/handleDeleteImage');
const constants = require('../constants');
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
        //save the event into approvedEvents collection
        await rejectedEvents.save();
        //delete the image from firebase
        handleDeleteImage(event.FileName);
        //delete the same events from createdevents collection
        await createdevents.findByIdAndDelete(eventId);
        res.render('home', {
            loggedIn: constants.LOGGED_IN,
            isAdmin: constants.ADMIN,
        });
    } catch (error) {
        console.log('🚀 ~ handleEventsApproval ~ error:', error.message);
    }
};

module.exports = handleEventsRejection;