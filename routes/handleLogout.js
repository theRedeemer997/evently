//route to logout
const handleLogout = (req, res) => {
  req.session.destroy();
  res.render("home");
};

module.exports = handleLogout;
