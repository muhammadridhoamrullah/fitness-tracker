const { Op } = require("sequelize");
const {
  User,
  Workout,
  Nutrition,
  BodyMeasurement,
} = require("../models/index");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

class Controller {
  static async Register(req, res, next) {
    try {
      const {
        username,
        email,
        password,
        age,
        gender,
        height,
        weight,
        fitnessGoal,
      } = req.body;

      // Validate input data
      if (!username || !email || !password) {
        throw { name: "USERNAME_EMAIL_PASSWORD_REQUIRED" };
      }

      const registerUser = await User.create({
        username,
        email,
        password,
        age,
        gender,
        height,
        weight,
        fitnessGoal,
      });

      res.status(201).json({
        id: registerUser.id,
        username: registerUser.username,
        email: registerUser.email,
      });
    } catch (error) {
      console.log(error, "error jebaoa");

      next(error);
    }
  }

  static async Login(req, res, next) {
    const { username, email, password } = req.body;

    // Check inputan
    if (!username && !email) {
      throw { name: "USERNAME_EMAIL_REQUIRED" };
    }

    if (!password) {
      throw { name: "PASSWORD_REQUIRED" };
    }

    // find user by username or email
    const findUser = await User.findOne({
      where: {
        [Op.or]: [{ username: username || null }, { email: email || null }],
      },
    });

    if (!findUser) {
      throw { name: "INVALID_EMAIL_PASSWORD" };
    }

    // Check password
    const checkPassword = comparePassword(password, findUser.password);

    if (!checkPassword) {
      throw { name: "INVALID_EMAIL_PASSWORD" };
    }

    // Generate Token
    const access_token = signToken({
      id: findUser.id,
    });

    res.status(200).json({
      access_token,
    });
  }
}

module.exports = {
  Controller,
};
