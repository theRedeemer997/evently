// route to handle the login functionality
const users = require('../model/user');
const organizer = require('../model/organizer');
const constants = require('../constants');
const generateDynamicMessage = require('../services/generateDynamicMessage');
const formatDateTime = require('../services/formatDataTime');

const handleLogin = async (req, res) => {
    const { email, password, typeOf } = req.body;
    // console.log("🚀 ~ handleLogin ~ typeOf:", typeOf);
    // console.log("🚀 ~ handleLogin ~ password:", password);
    // console.log("🚀 ~ handleLogin ~ email:", email);
    let err, loggedIn, lastVisitUsrMetrics, lastVisitMessage;
    let cookieOptions = {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
    };
    let cookieOptionsForLastVisit = {
        httpOnly: true,
        maxAge: 2 * 60 * 60 * 1000,
    };
    try {
        if (typeOf === undefined) {
            if (
                email === constants.ADMIN_EMAIL &&
                password === constants.ADMIN_PASSWORD
            ) {
                // let loggedIn = constants.LOGGED_IN;
                req.session.name = constants.ADMIN;
                req.session.type = constants.ADMIN;
                res.cookie('username', constants.ADMIN, cookieOptions);
                res.cookie('loggedIn', constants.LOGGED_IN, cookieOptions);
                res.cookie('isAdmin', constants.ADMIN, cookieOptions);
                res.cookie('typeOf', constants.ADMIN, cookieOptions);
                req.flash('loggedIn', constants.LOGGED_IN);
                req.flash('isAdmin', constants.ADMIN);
                res.redirect('/');
                // let isAdmin = constants.ADMIN;
                // res.render('home', { loggedIn, isAdmin });
            } else {
                const user = await users.findOne({
                    EmailAddress: email,
                    Password: password,
                });
                console.log('user exists', user);
                if (user) {
                    if (req.cookies.lastVisit === undefined) {
                        lastVisitUsrMetrics = formatDateTime(
                            new Date().toISOString()
                        );
                        res.cookie(
                            'lastVisit',
                            lastVisitUsrMetrics,
                            cookieOptionsForLastVisit
                        );
                        lastVisitMessage = generateDynamicMessage(
                            constants.WELCOME_MSG,
                            '${name}',
                            user.FirstName
                        );
                        console.log(lastVisitMessage);
                    } else {
                        lastVisitMessage =
                            generateDynamicMessage(
                                constants.VISITED_MSG,
                                '${name}',
                                user.FirstName
                            ) + req.cookies.lastVisit;
                        console.log(lastVisitMessage);
                    }
                    req.session.username = user.EmailAddress;
                    req.session.password = user.Password;
                    req.session.name = user.FirstName + ' ' + user.LastName;
                    req.session.type = constants.SESSION_USR;
                    res.cookie('username', user.EmailAddress, cookieOptions);
                    res.cookie('loggedIn', constants.LOGGED_IN, cookieOptions);
                    res.cookie('typeOf', constants.SESSION_USR, cookieOptions);
                    res.cookie(
                        'uname',
                        user.FirstName + ' ' + user.LastName,
                        cookieOptionsForLastVisit
                    );
                    req.flash('loggedIn', constants.LOGGED_IN);
                    req.flash('lastVisitMessage', lastVisitMessage);
                    console.log('🚀 ~ handleLogin ~ req.session:', req.session);
                    //res.render('home', { loggedIn: constants.LOGGED_IN });
                    res.redirect('/');
                } else {
                    err = constants.LOGIN_ERR;
                    res.render('login', { err });
                }
            }
        } else {
            const user = await organizer.findOne({
                EmailAddress: email,
                Password: password,
            });
            console.log('🚀 ~ handleLogin ~ organizer exists:', user);
            if (user) {
                if (req.cookies.lastVisit === undefined) {
                    lastVisitUsrMetrics = formatDateTime(
                        new Date().toISOString()
                    );
                    res.cookie(
                        'lastVisit',
                        lastVisitUsrMetrics,
                        cookieOptionsForLastVisit
                    );
                    lastVisitMessage = generateDynamicMessage(
                        constants.WELCOME_MSG,
                        '${name}',
                        user.FirstName
                    );
                    console.log(lastVisitMessage);
                } else {
                    lastVisitMessage =
                        generateDynamicMessage(
                            constants.VISITED_MSG,
                            '${name}',
                            user.FirstName
                        ) + req.cookies.lastVisit;
                    console.log(lastVisitMessage);
                }
                req.session.username = email;
                req.session.password = password;
                req.session.type = constants.SESSION_ORG;
                res.cookie('username', email, cookieOptions);
                res.cookie('loggedIn', constants.LOGGED_IN, cookieOptions);
                res.cookie('typeOf', constants.SESSION_ORG, cookieOptions);
                res.cookie(
                    'uname',
                    user.FirstName + ' ' + user.LastName,
                    cookieOptionsForLastVisit
                );
                console.log('🚀 ~ handleLogin ~ session:', req.session);
                //res.render('home', { loggedIn: constants.LOGGED_IN });
                req.flash('loggedIn', constants.LOGGED_IN);
                req.flash('lastVisitMessage', lastVisitMessage);
                res.redirect('/');
            } else {
                err = constants.LOGIN_ERR;
                res.render('login', { err });
            }
        }
    } catch (error) {
        console.log('error', error.message);
    }
};

module.exports = handleLogin;
