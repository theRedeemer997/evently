const createdevents = require('../model/createdevents');
const approvedevents = require('../model/approvedevents');
const constants = require('../constants');
const handleEventsApproval = async (req, res) => {
    try {
        const { eventId } = req.params;
        console.log('🚀 ~ handleEventsApproval ~ event id:', eventId);
        const event = await createdevents.findById(eventId);
        console.log('🚀 ~ handleEventsApproval ~ event found:', event);
        const approvedEvents = new approvedevents({
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
        await approvedEvents.save();
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

module.exports = handleEventsApproval;
