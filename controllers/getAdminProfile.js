const admin = require('../model/admin');
const createdevents = require('../model/createdevents');

const getAdminProfile = async (req, res) => {
    const ad = await admin.find();
    const evts = await createdevents.find();
    let length = evts.length;
    let l = ad.length;
    console.log('🚀 ~ getAdminProfile ~ ad:', ad);
    res.render('admin', { admins: ad, l, length });
};

module.exports = getAdminProfile;
