const isAdmin = (req, res, next) => {
  if (req.user.role === "ADMIN") {
    return next();
  }
  return res.status(404).send("Admins only");
};

module.exports = isAdmin;
