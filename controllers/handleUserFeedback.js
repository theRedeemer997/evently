const mongoose = require('mongoose');
const constant = require('../constants');
const handleUserFeedback = (req, res) => {
    const { loggedIn, typeOf } = req.cookies;

    console.log('🚀 ~ handleUserFeedback ~ typeOf:', typeOf);
    console.log('🚀 ~ handleUserFeedback ~ loggedIn:', loggedIn);

    try {
        if (loggedIn === constant.loggedIn && typeOf === 'user') {
        } else {
            req.flash('salutation', constant.SALUTATION_ORG);
            req.flash('notification', constant.FEEDBACK_EVNT_ERR);
            res.redirect('/');
        }
    } catch (error) {
        console.log('🚀 ~ handleUserFeedback ~ error:', error.message);
    }
};

module.exports = handleUserFeedback;
