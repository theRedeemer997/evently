const mongoose = require('mongoose');
const events = require('../model/approvedevents');
const user = require('../model/user');
const { createOrder } = require('../services/paypal');
const handleEventBooking = async (req, res) => {
    const { eventId, tickets, finalPrice } = req.body;
    try {
        const evt = await events.findById(eventId);
        const usr = await user.findOne({ EmailAddress: req.cookies.username });
        console.log('🚀 ~ handleCompleteOrder ~ usr:', usr);
        console.log('🚀 ~ handleCompleteOrder ~ evt:', evt);
        evt.SlotsAvailable = evt.SlotsAvailable - tickets;
        await evt.save();
        usr.BookedEvents.push({
            EventId: new mongoose.Types.ObjectId(eventId),
            EventName: evt.EventName,
            Tickets: tickets,
            FinalPrice: finalPrice,
        });
        await usr.save();
        const url = await createOrder(evt.EventName, finalPrice);
        console.log('🚀 ~ handleEventBooking ~ url:', url);
        res.redirect(url);
    } catch (error) {
        console.log('🚀 ~ handleEventBooking ~ error:', error.message);
    }
};

module.exports = handleEventBooking;
