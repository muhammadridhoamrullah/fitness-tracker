"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BodyMeasurement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BodyMeasurement.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  BodyMeasurement.init(
    {
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
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Weight is required",
          },
          notEmpty: {
            msg: "Weight is required",
          },
          isInt: {
            msg: "Weight must be an integer",
          },
          min: {
            args: [1],
            msg: "Weight must be at least 1 kg",
          },
        },
      },
      bodyFatPercentage: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: {
            msg: "Body Fat Percentage must be an integer",
          },
          min: {
            args: [0],
            msg: "Body Fat Percentage must be at least 0%",
          },
        },
      },
      muscleMass: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: {
            msg: "Muscle Mass must be an integer",
          },
          min: {
            args: [0],
            msg: "Muscle Mass must be at least 0 kg",
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
      modelName: "BodyMeasurement",
    }
  );
  return BodyMeasurement;
};
