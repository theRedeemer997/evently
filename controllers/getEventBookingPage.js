const approvedEvents = require('../model/approvedevents');
const constants = require('../constants');
const getEventBookingPage = async (req, res) => {
    const { loggedIn, typeOf } = req.cookies;
    try {
        if (loggedIn === constants.LOGGED_IN && typeOf === 'user') {
            const { eventId } = req.params;
            const findEvt = await approvedEvents.findById(eventId);
            console.log('🚀 ~ handleEventBooking ~ findEvt:', findEvt);
            res.render('bookevent', { event: findEvt });
        } else {
            req.flash('salutation', constants.SALUTATION_ORG);
            req.flash('notification', constants.BOOK_EVNT_ERR);
            res.redirect('/');
        }
    } catch (error) {
        console.log('🚀 ~ handleEventBooking ~ error:', error.message);
    }
};

module.exports = getEventBookingPage;
