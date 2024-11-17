const constants = require('../constants');
const generateDynamicMessage = require('../services/generateDynamicMessage');

// route to get the home page
const getHomePage = (req, res) => {
    const { isAdmin, username, loggedIn, typeOf } = req.cookies;
    console.log('🚀 ~ getHomePage ~ loggedIn:', loggedIn);
    console.log('🚀 ~ getHomePage ~ username:', username);
    console.log('🚀 ~ getHomePage ~ isAdmin:', isAdmin);
    //in case of admin details found  in the cookie then
    if (
        isAdmin !== undefined &&
        username !== undefined &&
        loggedIn !== undefined
    ) {
        res.render('home', { isAdmin, loggedIn });
    }
    //in case of user details found in the cookie then,
    //in case of organizer details found in the cookie then,
    else if (isAdmin === undefined && typeOf !== undefined) {
        if (req.cookies.lastVisit !== undefined) {
            lastVisitMessage =
                generateDynamicMessage(
                    constants.VISITED_MSG,
                    '${name}',
                    req.cookies.uname
                ) + req.cookies.lastVisit;
        }
        res.render('home', { loggedIn, lastVisitMessage });
    }
    // in case of organiser
    // console.log(req.session);
    // console.log(req.cookies);
    else res.render('home');
};

module.exports = getHomePage;
