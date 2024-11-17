const constants = require('../constants');
const events = require('../model/createdevents');
const getManageEventPage = async (req, res) => {
    const { name, type } = req.session;
    const { username, typeOf, loggedIn } = req.cookies;
    if (
        (username === constants.ADMIN &&
            typeOf === constants.ADMIN &&
            loggedIn === constants.LOGGED_IN) ||
        (name === constants.ADMIN && type === constants.ADMIN)
    ) {
        const createdEvents = await events.find();
        console.log('🚀 ~ getManageEventPage ~ events created:', createdEvents);
        res.render('rawevents', { createdEvents });
    } else {
        let salutation = 'Hi ' + '!!';
        let notification = constants.MANAGE_EVNT_ERR;
        res.render('login', {
            salutation,
            notification,
        });
    }
};

module.exports = getManageEventPage;
