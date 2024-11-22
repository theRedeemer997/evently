const approvedEvents = require('../model/approvedevents');
const constants = require('../constants');
const getEventBookingPage = async (req, res) => {
    const { loggedIn, typeOf } = req.cookies;
    try {
        const { eventId } = req.params;
        res.clearCookie('eID');
        res.clearCookie('page');
        if (loggedIn === constants.LOGGED_IN && typeOf === 'user') {
            const findEvt = await approvedEvents.findById(eventId);
            const { loggedIn, typeOf } = req.cookies;
            console.log('🚀 ~ handleEventBooking ~ findEvt:', findEvt);
            res.render('bookevent', { event: findEvt, loggedIn, typeOf });
        } else {
            res.cookie('page', 'bookevent', {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
            });
            res.cookie('eID', eventId, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
            });
            req.flash('salutation', constants.SALUTATION_ORG);
            req.flash('notification', constants.BOOK_EVNT_ERR);
            res.redirect('/');
        }
    } catch (error) {
        console.log('🚀 ~ handleEventBooking ~ error:', error.message);
    }
};

module.exports = getEventBookingPage;
