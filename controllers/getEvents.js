const events = require('../model/approvedevents');
const getEvents = async (req, res) => {
    const approvedEvents = await events.find();
    const { loggedIn, typeOf } = req.cookies;
    console.log('🚀 ~ getManageEventPage ~ events listed:', approvedEvents);
    res.render('events', { approvedEvents, loggedIn, typeOf });
};

module.exports = getEvents;
