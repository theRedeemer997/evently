const sendMail = require('../services/sendMail');
const createdevents = require('../model/createdevents');
const approvedevents = require('../model/approvedevents');
const constants = require('../constants');
const generateDynamicMessage = require('../services/generateDynamicMessage');
const handleEventsApproval = async (req, res) => {
    try {
        const { eventId } = req.params;
        console.log('🚀 ~ handleEventsApproval ~ event id:', eventId);
        const event = await createdevents.findById(eventId);
        console.log('🚀 ~ handleEventsApproval ~ event found:', event);
        const approvedEvents = new approvedevents({
            OrganizerName: event.OrganizerName,
            OrganizerEmail: event.OrganizerEmail,
            EventName: event.EventName,
            SlotsAvailable: event.SlotsAvailable,
            Price: event.Price,
            Description: event.Description,
            Address: event.Address,
            ImageUrl: event.ImageUrl,
            FileName: event.FileName,
            EventDateTime: event.EventDateTime,
        });
        //save the event into approvedEvents collection
        await approvedEvents.save();
        await sendMail(
            event.OrganizerEmail,
            generateDynamicMessage(
                constants.APP_SUB,
                '${eventName}',
                event.EventName
            ),
            constants.APP_MSG
        );
        //delete the same events from createdevents collection
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

module.exports = handleEventsApproval;
