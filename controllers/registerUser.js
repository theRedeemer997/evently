//get the becrypt dependency
const bcrypt = require('bcrypt');

//route to perform the post registration part
const user = require('../model/user');
const organizer = require('../model/organizer');
const constants = require('../constants');

const registerUser = async (req, res) => {
    const {
        email,
        firstName,
        lastName,
        password,
        typeOf,
        confirmEmail,
        organizationName,
    } = req.body;
    // console.log("🚀 ~ registerUser ~ organizationName:", organizationName);
    // console.log("🚀 ~ registerUser ~ confirmEmail:", confirmEmail);
    // console.log("🚀 ~ registerUser ~ typeOf:", typeOf);
    // console.log("🚀 ~ registerUser ~ password:", password);
    // console.log("🚀 ~ registerUser ~ lastName:", lastName);
    // console.log("🚀 ~ registerUser ~ firstName:", firstName);
    // console.log("🚀 ~ registerUser ~ email:", email);
    let usr;
    let error;
    try {
        //salt rounds tells the number of times the password should be hashed
        const saltRounds = 10;
        //  hash the password which is coming from the form and store in DB
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        typeOf === undefined
            ? (usr = new user({
                  EmailAddress: email,
                  FirstName: firstName,
                  LastName: lastName,
                  Password: hashedPassword,
              }))
            : (usr = new organizer({
                  EmailAddress: email,
                  FirstName: firstName,
                  LastName: lastName,
                  Password: hashedPassword,
                  OrganizerName: organizationName,
              }));

        if (typeOf === undefined) {
            if (email === confirmEmail) {
                await usr.save();
                let salutation = 'Hi ' + firstName;
                let notification = constants.RESISTRATION_SUCCESS;
                req.flash('salutation', salutation);
                req.flash('notification', notification);
                // res.render('login', {
                //     salutation,
                //     notification,
                // });
                res.redirect('/login');
            } else {
                err = constants.EMAIL_CONFIRM_EMAIL_ERR;
                res.render('register', {
                    err,
                    email,
                    firstName,
                    lastName,
                    typeOf,
                    organizationName,
                });
            }
        } else {
            console.log(organizationName === '');
            if (email === confirmEmail) {
                await usr.save();
                //res.redirect('/login');
                let salutation = 'Hi ' + firstName;
                let notification = constants.RESISTRATION_SUCCESS;
                req.flash('salutation', salutation);
                req.flash('notification', notification);
                // res.render('login', {
                //     salutation,
                //     notification,
                // });
                res.redirect('/login');
            } else {
                // error = constants.ORGANIZATION_NAME_ERR;
                // res.render('register', {
                //     error,
                //     email,
                //     firstName,
                //     lastName,
                //     typeOf,
                //     organizationName,
                // });
                err = constants.EMAIL_CONFIRM_EMAIL_ERR;
                res.render('register', {
                    err,
                    email,
                    firstName,
                    lastName,
                    typeOf,
                    organizationName,
                });
            }
        }
    } catch (error) {
        if (error.name === 'ValidationError') {
            console.log('🚀 ~ registerUser ~ error:', error);
            const errorMessages = Object.values(error.errors).map(
                (err) => err.message
            );
            console.log(
                '🚀 ~ registerUser ~ errorMessage:',
                errorMessages,
                errorMessages.length
            );

            if (typeOf === undefined) {
                res.render('register', {
                    error: errorMessages,
                    email,
                    firstName,
                    lastName,
                });
            } else {
                res.render('register', {
                    error: errorMessages,
                    email,
                    firstName,
                    lastName,
                    typeOf,
                    organizationName,
                });
            }
        }
    }
};

module.exports = registerUser;
