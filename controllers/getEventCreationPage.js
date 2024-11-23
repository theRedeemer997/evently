const constants = require('../constants');

/*
 * The function that loads the create event page if the user is a organizer
 */
const getEventCreationPage = (req, res) => {
    const { typeOf } = req.cookies;
    const { orgname, username } = req.session;
    console.log('🚀 ~ getEventCreationPage ~ orgname:', orgname, username);
    if (typeOf === constants.SESSION_ORG) {
        res.render('createvent', { orgname, username });
    } else {
        req.flash('salutation', constants.SALUTATION_ORG);
        req.flash('notification', constants.CREATE_EVNT_ERR);
        res.redirect('/');
    }
};

module.exports = getEventCreationPage;
