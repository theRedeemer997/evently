const user = require('../model/user');
const getUserProfile = async (req, res) => {
    let { username } = req.cookies;
    const usr = await user.findOne({ EmailAddress: username });
    const { loggedIn, typeOf } = req.cookies;
    console.log('🚀 ~ getUserProfile ~ usr:', usr);
    console.log('🚀 ~ getUserProfile ~ bookedEvents:', usr.BookedEvents);
    res.render('userProfile', { user: usr, loggedIn, typeOf });
};

module.exports = getUserProfile;
