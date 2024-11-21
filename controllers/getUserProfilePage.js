const user = require('../model/user');
const getUserProfile = async (req, res) => {
    let { username } = req.cookies;
    const usr = await user.findOne({ EmailAddress: username });
    console.log('🚀 ~ getUserProfile ~ usr:', usr);
    console.log('🚀 ~ getUserProfile ~ bookedEvents:', usr.BookedEvents);
    res.render('userProfile', { user: usr });
};

module.exports = getUserProfile;
