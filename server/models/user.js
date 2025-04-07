"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Workout, { foreignKey: "UserId" });
      User.hasMany(models.Nutrition, { foreignKey: "UserId" });
      User.hasMany(models.BodyMeasurement, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        unique: {
          msg: "Username already exists",
        },
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Username is required",
          },
          notNull: {
            msg: "Username is required",
          },
          len: {
            args: [5, 20],
            msg: "Username must be between 5 and 20 characters",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: {
          msg: "Email already exists",
        },
        allowNull: false,
        validate: {
          notNull: {
            msg: "Email is required",
          },
          notEmpty: {
            msg: "Email is required",
          },
          isEmail: {
            msg: "Email format is invalid",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password is required",
          },
          notEmpty: {
            msg: "Password is required",
          },
          len: {
            args: [8, 30],
            msg: "Password must be between 8 and 30 characters",
          },
          isAlphanumeric: {
            msg: "Password must contain letters and numbers",
          },
          is: {
            args: /^(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
            msg: "Password must contain at least one special character",
          },
          is: {
            args: /^(?=.*[A-Z])(?=.*[a-z])[a-zA-Z\d!@#$%^&*]{8,}$/,
            msg: "Password must contain at least one uppercase and one lowercase letter",
          },
        },
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: {
            msg: "Age must be a number",
          },
          min: {
            args: 0,
            msg: "Age must be a positive number",
          },
        },
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: {
            msg: "Height must be a number",
          },
          min: {
            args: 0,
            msg: "Height must be a positive number",
          },
          max: {
            args: 300,
            msg: "Height must be less than 300 cm",
          },
        },
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: {
            msg: "Weight must be a number",
          },
          min: {
            args: 0,
            msg: "Weight must be a positive number",
          },
          max: {
            args: 500,
            msg: "Weight must be less than 500 kg",
          },
        },
      },
      fitnessGoal: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((user) => {
    user.password = hashPassword(user.password);
  });
  return User;
};
