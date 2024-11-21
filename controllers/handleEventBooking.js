const mongoose = require('mongoose');
const constants = require('../constants');
const events = require('../model/approvedevents');
const user = require('../model/user');
const { createOrder } = require('../services/paypal');
const sendMail = require('../services/sendMail');
const handleEventBooking = async (req, res) => {
    const { eventId, tickets, finalPrice } = req.body;

    try {
        const evt = await events.findById(eventId);
        const usr = await user.findOne({
            EmailAddress: req.cookies.username,
        });
        console.log('🚀 ~ handleCompleteOrder ~ usr:', usr);
        console.log('🚀 ~ handleCompleteOrder ~ evt:', evt);
        console.log(
            tickets,
            evt.SlotsAvailable,
            tickets > evt.SlotsAvailable,
            typeof tickets,
            typeof evt.SlotsAvailable
        );
        if (Number(tickets) > Number(evt.SlotsAvailable)) {
            let err = constants.TICKET_INP_G_ERR;
            res.render('bookevent', { event: evt, err });
        } else {
            if (finalPrice === '0.00') {
                evt.SlotsAvailable = evt.SlotsAvailable - tickets;
                await evt.save();
                const index = usr.BookedEvents.findIndex((e) =>
                    e.EventId.equals(evt._id)
                );
                console.log('🚀 ~ handleEventBooking ~ index:', index);
                if (index > -1) {
                    usr.BookedEvents[index].Tickets =
                        parseInt(usr.BookedEvents[index].Tickets) +
                        parseInt(tickets);
                    usr.BookedEvents[index].FinalPrice =
                        parseFloat(usr.BookedEvents[index].FinalPrice) +
                        parseFloat(finalPrice);
                } else {
                    usr.BookedEvents.push({
                        EventId: new mongoose.Types.ObjectId(eventId),
                        EventName: evt.EventName,
                        Tickets: tickets,
                        FinalPrice: finalPrice,
                    });
                }
                await usr.save();
                res.redirect('/events');
            } else {
                evt.SlotsAvailable = evt.SlotsAvailable - tickets;
                await evt.save();
                const index = usr.BookedEvents.findIndex((e) =>
                    e.EventId.equals(evt._id)
                );
                console.log('🚀 ~ handleEventBooking ~ index:', index);
                if (index > -1) {
                    usr.BookedEvents[index].Tickets =
                        parseInt(usr.BookedEvents[index].Tickets) +
                        parseInt(tickets);
                    usr.BookedEvents[index].FinalPrice =
                        parseFloat(usr.BookedEvents[index].FinalPrice) +
                        parseFloat(finalPrice);
                } else {
                    usr.BookedEvents.push({
                        EventId: new mongoose.Types.ObjectId(eventId),
                        EventName: evt.EventName,
                        Tickets: tickets,
                        FinalPrice: finalPrice,
                    });
                }
                await usr.save();
                const url = await createOrder(evt.EventName, finalPrice);
                console.log('🚀 ~ handleEventBooking ~ url:', url);
                res.redirect(url);
            }
            let subject = `Booking Confirmation - Thank You for choosing us ! 🎉🎉`;
            let msg = ` Dear ${usr.FirstName}, <br><br> 
            We are delighted to confirm your booking! Here are the details: <br><br>
                        Event Name: ${evt.EventName}, <br>
                        Location:  ${evt.Address}, <br>
                        Tickets Booked: ${tickets} <br>
                        Total Price: ${finalPrice} <br><br>
                                
                        Your booking ID is ${evt._id}. Please keep this for reference.<br>`;
            await sendMail(usr.EmailAddress, subject, msg);
        }
    } catch (error) {
        console.log('🚀 ~ handleEventBooking ~ error:', error.message);
    }
};

module.exports = handleEventBooking;
