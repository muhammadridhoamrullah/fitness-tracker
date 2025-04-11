const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models/index");
async function authentication(req, res, next) {
  try {
    // Check authorization
    const { authorization } = req.headers;

    if (!authorization) {
      throw { name: "UNAUTHORIZED" };
    }

    // Ambil token dari authorization header
    const token = authorization.split(" ")[1];

    const payload = verifyToken(token);

    // Cari user berdasarkan id dari payload

    const findUser = await User.findByPk(payload.id);

    if (!findUser) {
      throw { name: "UNAUTHORIZED" };
    }

    // Suntik user ke request
    req.user = {
      id: findUser.id,
      username: findUser.username,
      email: findUser.email,
    };

    // Lanjutkan ke middleware berikutnya

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authentication,
};
