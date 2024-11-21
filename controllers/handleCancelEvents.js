const user = require('../model/user');
const events = require('../model/approvedevents');
const mongoose = require('mongoose');
const sendEmail = require('../services/sendMail');
const handleCancelEvent = async (req, res) => {
    const { username } = req.cookies;
    const { tickets, eventId } = req.body;
    console.log('🚀 ~ handleCancelEvent ~ tickets:', tickets);
    console.log('🚀 ~ handleCancelEvent ~ eventId:', eventId, typeof eventId);
    const formattedEventId = new mongoose.Types.ObjectId(eventId);
    try {
        const usr = await user.findOne({ EmailAddress: username });
        console.log('🚀 ~ exports.handleCancelEvent=async ~ usr:', usr);
        usr.BookedEvents.forEach((event) => {
            console.log('DB EventId:', event.EventId, typeof event.EventId);
            console.log(
                'Query EventId:',
                formattedEventId,
                typeof formattedEventId
            );
        });

        const evt = await events.findById(eventId);
        console.log('🚀 ~ handleCancelEvent ~ evt:', evt);
        evt.SlotsAvailable = parseInt(evt.SlotsAvailable) + parseInt(tickets);
        await evt.save();

        const updatedUsr = await user.findByIdAndUpdate(
            usr._id,
            { $pull: { BookedEvents: { EventId: formattedEventId } } }, // Remove event with matching EventId
            { new: true } // Return the updated document
        );
        console.log('🚀 ~ handleCancelEvent ~ updatedUsr:', updatedUsr);
        let subject = `Cancellation Confirmation`;
        let msg = ` Dear ${usr.FirstName}, <br><br> 
            We have cancelled you booking. Here are the details: <br><br>
                        Event Name: ${evt.EventName}, <br>
                        Location:  ${evt.Address}, <br>
                        Tickets Booked: ${tickets} <br><br>
                                
                        Your booking ID is ${evt._id}. Please keep this for reference.<br><br>
                        
                        Your refund will be processed in 7 business days <br>`;
        await sendEmail(usr.EmailAddress, subject, msg);

        res.render('userProfile', { user: updatedUsr });
    } catch (error) {
        console.log('🚀 ~ error:', error.message);
    }
};

module.exports = handleCancelEvent;
