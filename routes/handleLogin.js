// route to handle the login functionality
const users = require("../model/user");
const organizer = require("../model/organizer");

const handleLogin = async (req, res) => {
  const { email, password, typeOf } = req.body;
  // console.log("🚀 ~ handleLogin ~ typeOf:", typeOf);
  // console.log("🚀 ~ handleLogin ~ password:", password);
  // console.log("🚀 ~ handleLogin ~ email:", email);
  let err, loggedIn;
  try {
    if (typeOf === undefined) {
      const user = await users.findOne({
        EmailAddress: email,
        Password: password,
      });
      console.log("user exists", user);
      if (user) {
        req.session.username = email;
        req.session.password = password;
        req.session.type = "user";
        res.render("home", { loggedIn: "loggedIn" });
      } else {
        err = "Incorrect email or password";
        res.render("login", { err });
      }
    } else {
      const user = await organizer.findOne({
        EmailAddress: email,
        Password: password,
      });
      console.log("organizer exists", user);
      if (user) {
        req.session.username = email;
        req.session.password = password;
        req.session.type = "organizer";
        res.render("home", { loggedIn: "loggedIn" });
      } else {
        err = "Incorrect email or password";
        res.render("login", { err });
      }
    }
  } catch (error) {
    console.log("error", error.message);
  }
};

module.exports = handleLogin;
