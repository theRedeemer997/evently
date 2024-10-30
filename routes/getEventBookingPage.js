const constants = require('../constants');

//route to ge the  create event page
const getEventBookingPage = (req, res) => {
    if (req.session.type === constants.SESSION_ORG) {
        res.render('createvent');
    } else {
        let salutation = 'Hi ';
        let notification = constants.CREATE_EVNT_ERR;
        res.render('home', {
            salutation,
            notification,
        });
        //res.redirect('/');
    }
};

module.exports = getEventBookingPage;
