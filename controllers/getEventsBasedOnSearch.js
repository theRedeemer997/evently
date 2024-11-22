    const approvedevents = require('../model/approvedevents');

    const getEventsBasedOnSearch = async (req, res) => {
        const { query } = req.query;
        console.log('🚀 ~ getEventsBasedOnSearch ~ query:', query);
        try {
            const events = await approvedevents.find({
                $or: [
                    { EventName: { $regex: query, $options: 'i' } },
                    { OrganizerName: { $regex: query, $options: 'i' } },
                    { Address: { $regex: query, $options: 'i' } },
                ],
            });

            res.render('events', { approvedEvents: events });
        } catch (error) {
            console.log('🚀 ~ getEventsBasedOnSearch ~ error:', error);
        }
    };

    module.exports = getEventsBasedOnSearch;
