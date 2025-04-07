"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Workout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Workout.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  Workout.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name Workout is required",
          },
          notEmpty: {
            msg: "Name Workout is required",
          },
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Type Workout is required",
          },
          notEmpty: {
            msg: "Type Workout is required",
          },
        },
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Duration Workout is required",
          },
          notEmpty: {
            msg: "Duration Workout is required",
          },
          isInt: {
            msg: "Duration Workout must be an integer",
          },
          min: {
            args: [1],
            msg: "Duration Workout must be at least 1 minute",
          },
        },
      },
      caloriesBurned: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: {
            msg: "Calories Burned must be an integer",
          },
          min: {
            args: [0],
            msg: "Calories Burned must be at least 0",
          },
        },
      },
      difficulty: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "UserId is required",
          },
          notEmpty: {
            msg: "UserId is required",
          },
        },
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Date is required",
          },
          notEmpty: {
            msg: "Date is required",
          },
          isDate: {
            msg: "Date must be a valid date",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Workout",
    }
  );
  return Workout;
};
