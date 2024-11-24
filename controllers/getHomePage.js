const constants = require('../constants');
const formatDateTime = require('../services/formatDataTime');
const generateDynamicMessage = require('../services/generateDynamicMessage');
const createdEvents = require('../model/createdevents');
const ratings = require('../model/ratings');

let lastVisitMessage = '';
// route to get the home page
const getHomePage = async (req, res) => {
    const evts = await ratings.find({ Rating: 5 });
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
        const evt = await createdEvents.find();
        let length = evt.length;
        res.render('home', { isAdmin, loggedIn, length, evts });
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
        res.render('home', { loggedIn, lastVisitMessage, typeOf, evts });
    }
    // in case of organiser
    // console.log(req.session);
    // console.log(req.cookies);
    else res.render('home', { evts });
};

module.exports = getHomePage;
