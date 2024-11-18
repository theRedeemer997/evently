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
            error = constants.EMAIL_CONFIRM_EMAIL_ERR;
            res.render('register', {
                error,
                email,
                firstName,
                lastName,
                typeOf,
                organizationName,
            });
        }
    } else {
        console.log(organizationName === '');
        if (email === confirmEmail && organizationName !== '') {
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
            error = constants.ORGANIZATION_NAME_ERR;
            res.render('register', {
                error,
                email,
                firstName,
                lastName,
                typeOf,
                organizationName,
            });
        }
    }
};

module.exports = registerUser;
