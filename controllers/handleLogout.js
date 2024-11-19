const constants = require('../constants');

//route to logout
const handleLogout = (req, res) => {
    // req.session.destroy();
    // res.render('home');
    req.session.destroy((err) => {
        if (err) {
            console.log('Error destroying session:', err);
            return res.redirect('/'); // Redirect to home or login if there’s an error
        }
        const cookieValue = constants.COOKIES;
        for (let cookie of cookieValue) {
            res.clearCookie(cookie);
        }
        res.clearCookie('connect.sid'); // Clear session cookie
        res.redirect('/'); // Redirect to home page
    });
};

module.exports = handleLogout;
