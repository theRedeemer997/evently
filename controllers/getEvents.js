const events = require('../model/approvedevents');
const getEvents = async (req, res) => {
    const approvedEvents = await events.find();
    console.log('🚀 ~ getManageEventPage ~ events listed:', approvedEvents);
    res.render('events', { approvedEvents });
};

module.exports = getEvents;
