const approvedEvents = require('../model/approvedevents');
//get the becrypt dependency
const bcrypt = require('bcrypt');
// route to handle the login functionality
const users = require('../model/user');
const organizer = require('../model/organizer');
const constants = require('../constants');

const handleLogin = async (req, res) => {
    const { email, password, typeOf, lastVisit } = req.body;
    console.log('🚀 ~ handleLogin ~ lastVisit:', lastVisit);
    // console.log("🚀 ~ handleLogin ~ typeOf:", typeOf);
    // console.log("🚀 ~ handleLogin ~ password:", password);
    // console.log("🚀 ~ handleLogin ~ email:", email);
    let err;
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
                });
                const { eID, page } = req.cookies;
                console.log('🚀 ~ handleLogin ~ page:', page);
                console.log('🚀 ~ handleLogin ~ eID:', eID);
                const evt = await approvedEvents.findById(eID);
                //compare if the passwords are same
                const isMatch = await bcrypt.compare(password, user.Password);
                if (user && isMatch) {
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
                    //req.flash('lastVisitMessage', lastVisitMessage);
                    console.log('🚀 ~ handleLogin ~ req.session:', req.session);
                    //res.render('home', { loggedIn: constants.LOGGED_IN });
                    if (eID && page) {
                        //res.render('bookevent', { event: evt });
                        res.redirect(`/bookevent/${eID}`);
                    } else res.redirect('/');
                } else {
                    err = constants.LOGIN_ERR;
                    res.render('login', { err });
                }
            }
        } else {
            const user = await organizer.findOne({
                EmailAddress: email,
            });
            //compare if the passwords are same
            const isMatch = await bcrypt.compare(password, user.Password);
            console.log('🚀 ~ handleLogin ~ organizer exists:', user);
            if (user && isMatch) {
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
                // req.flash('lastVisitMessage', lastVisitMessage);
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
