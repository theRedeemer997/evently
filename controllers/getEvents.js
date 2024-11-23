const events = require('../model/approvedevents');
const deleteExpiredEvents = require('../services/deleteExpiredEvents');
const getEvents = async (req, res) => {
    await deleteExpiredEvents();
    const approvedEvents = await events.find();
    const { loggedIn, typeOf } = req.cookies;
    console.log('🚀 ~ getManageEventPage ~ events listed:', approvedEvents);
    res.render('events', { approvedEvents, loggedIn, typeOf });
};

module.exports = getEvents;
