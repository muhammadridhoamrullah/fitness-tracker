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
          notNull: {
            msg: "Name Nutrition is required",
          },
          notEmpty: {
            msg: "Name Nutrition is required",
          },
        },
      },
      calories: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Calories Nutrition is required",
          },
          notEmpty: {
            msg: "Calories Nutrition is required",
          },
          isInt: {
            msg: "Calories Nutrition must be an integer",
          },
          min: {
            args: [1],
            msg: "Calories Nutrition must be at least 1 calorie",
          },
        },
      },
      protein: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: {
            msg: "Protein Nutrition must be an integer",
          },
          min: {
            args: [0],
            msg: "Protein Nutrition must be at least 0 grams",
          },
        },
      },
      carbs: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: {
            msg: "Carbs Nutrition must be an integer",
          },
          min: {
            args: [0],
            msg: "Carbs Nutrition must be at least 0 grams",
          },
        },
      },
      fat: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: {
            msg: "Fat Nutrition must be an integer",
          },
          min: {
            args: [0],
            msg: "Fat Nutrition must be at least 0 grams",
          },
        },
      },
      mealType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Meal Type Nutrition is required",
          },
          notEmpty: {
            msg: "Meal Type Nutrition is required",
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
            msg: "Date Nutrition is required",
          },
          notEmpty: {
            msg: "Date Nutrition is required",
          },
          isDate: {
            msg: "Date Nutrition must be a valid date",
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
