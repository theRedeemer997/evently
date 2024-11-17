const constants = require('../constants');

//route to ge the  create event page
const getEventBookingPage = (req, res) => {
    const { typeOf } = req.cookies;
    /*
     *   typeOf === constants.SESSION_ORG ||
     *   req.session.type === constants.SESSION_ORG
     */
    if (typeOf === constants.SESSION_ORG) {
        res.render('createvent');
    } else {
        // let salutation = constants.SALUTATION_ORG;
        // let notification = constants.CREATE_EVNT_ERR;
        req.flash('salutation', constants.SALUTATION_ORG);
        req.flash('notification', constants.CREATE_EVNT_ERR);
        res.redirect('/');
    }
};

module.exports = getEventBookingPage;
