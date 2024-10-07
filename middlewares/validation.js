const { body, validationResult } = require("express-validator");

const validateRegistration = [
  body("username")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long")
    .isAlphanumeric()
    .withMessage("Username must contain only letters and numbers"),
  body("password")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 3 characters long"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    return true;
  }),
];

const validatePost = [
  body("title")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 3, max: 30 })
    .withMessage("Title must be between 3 and 30 characters long"),
  body("content")
    .isString()
    .withMessage("Content must be a string")
    .isLength({ min: 3 })
    .withMessage("Content must be at least 3 characters long"),
];

const validateComment = [
  body("content")
    .isString()
    .withMessage("Content must be a string")
    .isLength({ min: 3 })
    .withMessage("Comment must be at least 3 characters long"),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateRegistration,
  validatePost,
  validateComment,
  handleValidationErrors,
};
