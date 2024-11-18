const constants = require('../constants');
const formatDateTime = require('../services/formatDataTime');
const generateDynamicMessage = require('../services/generateDynamicMessage');

let lastVisitMessage = '';
// route to get the home page
const getHomePage = (req, res) => {
    const { isAdmin, username, loggedIn, typeOf, lastVisit, uname } =
        req.cookies;
    console.log('🚀 ~ getHomePage ~ lastVisit:', lastVisit);
    console.log('🚀 ~ getHomePage ~ loggedIn:', loggedIn);
    console.log('🚀 ~ getHomePage ~ username:', username);
    console.log('🚀 ~ getHomePage ~ isAdmin:', isAdmin);
    console.log(req.cookies);
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
        if (lastVisit !== undefined) {
            lastVisitMessage =
                generateDynamicMessage(
                    constants.VISITED_MSG,
                    '${name}',
                    uname
                ) + lastVisit;
        } else {
            lastVisitMessage = generateDynamicMessage(
                constants.WELCOME_MSG,
                '${name}',
                uname
            );
            lastVisitUsrMetrics = formatDateTime(new Date().toISOString());
            res.cookie('lastVisit', lastVisitUsrMetrics, {
                httpOnly: true,
                maxAge: 2 * 60 * 60 * 1000,
            });
        }
        res.render('home', { loggedIn, lastVisitMessage });
    }
    // in case of organiser
    // console.log(req.session);
    // console.log(req.cookies);
    else res.render('home');
};

module.exports = getHomePage;
