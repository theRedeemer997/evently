// route to get the home page
const getHomePage = (req, res) => {
    console.log(req.session);
    res.render('home');
};

module.exports = getHomePage;
