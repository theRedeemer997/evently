const events = require('../model/approvedevents');
const user = require('../model/user');
const getEventDetailsPage = async (req, res) => {
    const { username } = req.cookies;
    const { eventId } = req.params;
    const evt = await events.findById(eventId);
    console.log('🚀 ~ getEventDetailsPage ~ evt:', evt);
    if (username !== undefined) {
        
        const usr = await user.findOne({ EmailAddress: username });
        res.render('viewEvent', { event: evt, user: usr });
    } else res.render('viewEvent', { event: evt });
};

module.exports = getEventDetailsPage;
