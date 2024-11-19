const approvedEvents = require('../model/approvedevents');

const handleEventBooking = async (req, res) => {
    try {
        const { eventId } = req.params;
        const findEvt = await approvedEvents.findById(eventId);
        console.log('🚀 ~ handleEventBooking ~ findEvt:', findEvt);
        res.render('bookevent', { event: findEvt });
    } catch (error) {
        console.log('🚀 ~ handleEventBooking ~ error:', error.message);
    }
};

module.exports = handleEventBooking;
