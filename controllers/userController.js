const bcrypt = require("bcryptjs");

async function register(req, res) {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prismaQueries.createUser(username, hashedPassword);
  } catch (err) {
    console.error(err);
  }
}

async function logout(req, res, next) {
  try {
    req.logout((err) => {
      if (err) return next(err);
      res.redirect("/");
    });
  } catch (err) {
    handleError(res, err);
  }
}

module.exports = { register, logout };
