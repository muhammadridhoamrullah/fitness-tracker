"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Nutrition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Nutrition.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  Nutrition.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name is required",
          },
          notNull: {
            msg: "Name is required",
          },
        },
      },
      calories: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Calories is required",
          },
          notEmpty: {
            msg: "Calories is required",
          },
        },
      },
      protein: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      carbs: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      fat: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      mealType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Meal Type is required",
          },
          notEmpty: {
            msg: "Meal Type is required",
          },
        },
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
        },
      },
    },
    {
      sequelize,
      modelName: "Nutrition",
    }
  );
  return Nutrition;
};
