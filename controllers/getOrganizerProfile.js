const admin = require('../model/admin');

const getOrganizerProfile = async (req, res) => {
    const { orgname } = req.cookies;
    console.log('🚀 ~ getOrganizerProfile ~ orgname:', orgname);
    try {
        const evts = await admin.find({ OrganizerName: orgname });
        console.log('🚀 ~ getOrganizerProfile ~ evts:', evts);
        res.render('organizerprofile', { admins: evts });
    } catch (error) {
        console.log('🚀 ~ getOrganizerProfile ~ error:', error);
    }
};

module.exports = getOrganizerProfile;
