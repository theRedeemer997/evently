const mongoose = require('mongoose');
const user = require('../model/user');
const events = require('../model/approvedevents');
const handleEventBooking = async (req, res) => {
    try {
        const { eventId, tickets, finalPrice } = req.body;
        const usr = await user.findOne({ EmailAddress: req.cookies.username });
        const evt = await events.findById(eventId);
        console.log('🚀 ~ handleEventBooking ~ user:', usr);
        console.log('🚀 ~ handleEventBooking ~ tickets:', tickets);
        console.log('🚀 ~ handleEventBooking ~ eventId:', eventId);
        if (tickets > evt.SlotsAvailable) {
            //TODO: handle the error condition here
        } else {
            evt.SlotsAvailable = evt.SlotsAvailable - tickets;
            await evt.save();
            usr.BookedEvents.push({
                EventId: new mongoose.Types.ObjectId(eventId),
                EventName: evt.EventName,
                Tickets: tickets,
                FinalPrice: finalPrice,
            });
            await usr.save();
            res.redirect('/events');
        }
    } catch (error) {
        console.log('🚀 ~ handleEventBooking ~ error:', error.message);
    }
};

module.exports = handleEventBooking;
