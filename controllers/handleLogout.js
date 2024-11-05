//route to logout
const handleLogout = (req, res) => {
    // req.session.destroy();
    // res.render('home');
    req.session.destroy((err) => {
        if (err) {
            console.log('Error destroying session:', err);
            return res.redirect('/'); // Redirect to home or login if there’s an error
        }
        res.clearCookie('connect.sid'); // Clear session cookie
        res.redirect('/login'); // Redirect to login page
    });
};

module.exports = handleLogout;
