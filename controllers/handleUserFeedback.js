const mongoose = require('mongoose');
const ratings = require('../model/ratings');
const user = require('../model/user');
const approvedevents = require('../model/approvedevents');
const handleUserFeedback = async (req, res) => {
    const { loggedIn, typeOf } = req.cookies;

    console.log('🚀 ~ handleUserFeedback ~ typeOf:', typeOf, typeof typeOf);
    console.log(
        '🚀 ~ handleUserFeedback ~ loggedIn:',
        loggedIn,
        typeof loggedIn
    );

    try {
        if (typeOf === 'user' && loggedIn === 'loggedIn') {
            const { rating, customerFeedback, userId, eventId, eventName } =
                req.body;
            console.log('🚀 ~ handleUserFeedback ~ userId:', userId);
            console.log('🚀 ~ handleUserFeedback ~ rating:', rating);
            const rat = ratings.findById({ EventId: eventId });
            if (rat === undefined) {
                const newRating = new ratings({
                    UserId: new mongoose.Types.ObjectId(userId),
                    EventId: new mongoose.Types.ObjectId(eventId),
                    Rating: rating,
                    Feedback: customerFeedback,
                });
                const finalRatingSaved = await newRating.save();
                const usr = await user.findById(userId);
                usr.SubmittedRatings.push({
                    RatingId: new mongoose.Types.ObjectId(finalRatingSaved._id),
                    EventName: eventName,
                    Rating: rating,
                    Feedback: customerFeedback,
                });
                await usr.save();
                const events = await approvedevents.findById(eventId);
                events.Ratings.push({
                    RatingId: new mongoose.Types.ObjectId(finalRatingSaved._id),
                    EventName: eventName,
                    Rating: rating,
                    Feedback: customerFeedback,
                });
                await events.save();
                console.log(
                    '🚀 ~ handleUserFeedback ~ customerFeedback:',
                    customerFeedback
                );
                res.render('viewEvent', { event: events, user: usr });
            } else {
                const events = await approvedevents.findById(eventId);
                const usr = await user.findById(userId);
                let err =
                    'You have already submitted feedback for this event. Thank you for sharing your thoughts!';
                res.render('viewEvent', { event: events, user: usr, err });
            }
        } else {
            req.flash('salutation', constant.SALUTATION_ORG);
            req.flash('notification', constant.FEEDBACK_EVNT_ERR);
            res.redirect('/');
        }
    } catch (error) {
        console.log('🚀 ~ handleUserFeedback ~ error:', error.message);
    }
};

module.exports = handleUserFeedback;
