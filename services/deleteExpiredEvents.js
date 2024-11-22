const approvedEvents = require('../model/approvedevents');
const handleDeleteImage = require('./handleDeleteImage');
//function to delete the expired events
// The below function works when the db is started
async function deleteExpiredEvents() {
    try {
        const currentDate = new Date();
        console.log('🚀 ~ deleteExpiredEvents ~ currentDate:', currentDate);
        const expiredEvents = await approvedEvents.find({
            EventDateTime: { $lt: currentDate },
        });
        console.log('🚀 ~ deleteExpiredEvents ~ expiredEvents:', expiredEvents);
        for (const evt of expiredEvents) {
            await handleDeleteImage(
                evt.FileName,
                evt.OrganizerName,
                evt.EventName
            );
        }
        await approvedEvents.deleteMany({
            EventDateTime: { $lt: currentDate },
        });
    } catch (error) {
        console.log('🚀 ~ deleteExpiredEvents ~ error:', error.message);
    }
}

module.exports = deleteExpiredEvents;
