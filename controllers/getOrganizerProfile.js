const admin = require('../model/admin');
const createdevents = require('../model/createdevents');
const organizer = require('../model/organizer');
let admins;

const getOrganizerProfile = async (req, res) => {
    const { orgname } = req.cookies;
    console.log('🚀 ~ getOrganizerProfile ~ orgname:', orgname);
    try {
        let evts = await admin.find({ OrganizerName: orgname });
        let evt = await createdevents.find({ OrganizerName: orgname });
        if (evts.length > 0) {
            admins = evts;
        } else admins = evt;
        const user = await organizer.findOne({ OrganizerName: orgname });
        console.log('🚀 ~ getOrganizerProfile ~ evts:', admins);
        res.render('organizerprofile', { admins, user });
        console.log('🚀 ~ getOrganizerProfile ~ user:', user);
    } catch (error) {
        console.log('🚀 ~ getOrganizerProfile ~ error:', error);
    }
};

module.exports = getOrganizerProfile;
