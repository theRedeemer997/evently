const events = require('../model/approvedevents');
const getEventDetailsPage = async (req, res) => {
    const { eventId } = req.params;
    const evt = await events.findById(eventId);
    console.log('🚀 ~ getEventDetailsPage ~ evt:', evt);
    res.render('viewEvent', { event: evt });
};

module.exports = getEventDetailsPage;
