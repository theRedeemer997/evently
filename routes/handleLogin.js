// route to handle the login functionality
const users = require('../model/user');
const organizer = require('../model/organizer');
const constants = require('../constants');

const handleLogin = async (req, res) => {
    const { email, password, typeOf } = req.body;
    // console.log("🚀 ~ handleLogin ~ typeOf:", typeOf);
    // console.log("🚀 ~ handleLogin ~ password:", password);
    // console.log("🚀 ~ handleLogin ~ email:", email);
    let err, loggedIn;
    try {
        if (typeOf === undefined) {
            if (
                email === constants.ADMIN_EMAIL &&
                password === constants.ADMIN_PASSWORD
            ) {
                let loggedIn = constants.LOGGED_IN;
                req.session.name = constants.ADMIN;
                req.session.type = constants.ADMIN;
                let isAdmin = constants.ADMIN;
                res.render('home', { loggedIn, isAdmin });
            } else {
                const user = await users.findOne({
                    EmailAddress: email,
                    Password: password,
                });
                console.log('user exists', user);
                if (user) {
                    req.session.username = user.EmailAddress;
                    req.session.password = user.Password;
                    req.session.name = user.FirstName + ' ' + user.LastName;
                    req.session.type = constants.SESSION_USR;
                    console.log('🚀 ~ handleLogin ~ req.session:', req.session);
                    res.render('home', { loggedIn: constants.LOGGED_IN });
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
                req.session.username = email;
                req.session.password = password;
                req.session.type = constants.SESSION_ORG;
                console.log('🚀 ~ handleLogin ~ session:', req.session);
                res.render('home', { loggedIn: constants.LOGGED_IN });
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
