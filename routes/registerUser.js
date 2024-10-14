//route to perform the post registration part
const user = require("../model/user");
const organizer = require("../model/organizer");

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
  typeOf === undefined
    ? (usr = new user({
        EmailAddress: email,
        FirstName: firstName,
        LastName: lastName,
        Password: password,
      }))
    : (usr = new organizer({
        EmailAddress: email,
        FirstName: firstName,
        LastName: lastName,
        Password: password,
        OrganizerName: organizationName,
      }));

  if (typeOf === undefined) {
    if (email === confirmEmail) {
      await usr.save();
      res.redirect("/login");
    } else {
      error = "The Email and the Confirm Email should be same";
      res.render("register", {
        error,
        email,
        firstName,
        lastName,
        typeOf,
        organizationName,
      });
    }
  } else {
    console.log(organizationName === "");
    if (email === confirmEmail && organizationName !== "") {
      await usr.save();
      res.redirect("/login");
    } else {
      error = "Please fill out the organization name";
      res.render("register", {
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
