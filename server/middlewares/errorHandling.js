async function errorHandler(err, req, res, next) {
  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    const errors = err.errors.map((error) => error.message);
    return res.status(400).json({ message: errors });
  } else if (err.name === "USERNAME_EMAIL_PASSWORD_REQUIRED") {
    return res.status(400).json({
      message: "Username, email, and password are required",
    });
  } else if (err.name === "USERNAME_EMAIL_REQUIRED") {
    return res.status(400).json({
      message: "Username or Email is required",
    });
  } else if (err.name === "PASSWORD_REQUIRED") {
    return res.status(400).json({
      message: "Password is required",
    });
  } else if (err.name === "INVALID_EMAIL_PASSWORD") {
    return res.status(400).json({
      message: "Invalid Email or Password",
    });
  }
}

module.exports = {
  errorHandler,
};
