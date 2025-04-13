const { Op, where } = require("sequelize");
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

  static async GetAllWorkouts(req, res, next) {
    try {
      const workouts = await Workout.findAll({
        where: {
          UserId: req.user.id,
        },
        include: {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
      });

      res.status(200).json(workouts);
    } catch (error) {
      next(error);
    }
  }

  static async DoWorkout(req, res, next) {
    try {
      const { name, type, duration, caloriesBurned, difficulty, date } =
        req.body;

      if (!name || !type || !duration || !date) {
        throw { name: "WORKOUT_FIELDS_REQUIRED" };
      }

      const workout = await Workout.create({
        name,
        type,
        duration,
        caloriesBurned,
        difficulty,
        date,
        UserId: req.user.id,
      });

      res.status(201).json({
        message: "Workout added successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  static async GetAllNutrition(req, res, next) {
    try {
      const nutritions = await Nutrition.findAll({
        where: {
          UserId: req.user.id,
        },
        include: {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
      });

      res.status(200).json(nutritions);
    } catch (error) {
      console.log(error, "error apa boi");

      next(error);
    }
  }

  static async AddNutrition(req, res, next) {
    try {
      const { name, calories, protein, carbs, fat, mealType, date } = req.body;
      console.log(req.body, "ini body nutrition");

      if (!name || !calories || !mealType || !date) {
        throw { name: "NUTRITION_FIELDS_REQUIRED" };
      }

      const nutrition = await Nutrition.create({
        name,
        calories,
        protein,
        carbs,
        fat,
        mealType,
        date,
        UserId: req.user.id,
      });

      res.status(201).json({
        message: "Nutrition added successfully",
      });
    } catch (error) {
      console.log(error, "error apa boi");

      next(error);
    }
  }

  static async AddBodyMeasurement(req, res, next) {
    try {
      const { weight, bodyFatPercentage, muscleMass, date } = req.body;

      if (!weight || !date) {
        throw { name: "BODY_MEASUREMENT_FIELDS_REQUIRED" };
      }

      const bodyMeasurement = await BodyMeasurement.create({
        weight,
        bodyFatPercentage,
        muscleMass,
        date,
        UserId: req.user.id,
      });

      res.status(201).json({
        message: "Body Measurement added successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  static async GetAllBodyMeasurements(req, res, next) {
    try {
      const bodyMeasurements = await BodyMeasurement.findAll({
        where: {
          UserId: req.user.id,
        },
        include: {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
      });

      res.status(200).json(bodyMeasurements);
    } catch (error) {
      next(error);
    }
  }

  static async GetUserProfile(req, res, next) {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: Workout,
          },
          {
            model: Nutrition,
          },
          {
            model: BodyMeasurement,
          },
        ],
      });

      if (!user) {
        throw { name: "USER_NOT_FOUND" };
      }

      res.status(200).json(user);
    } catch (error) {
      console.log(error, "error di GetUseProfile");

      next(error);
    }
  }

  static async UpdateWorkout(req, res, next) {
    try {
      const { id } = req.params;

      const { name, type, duration, caloriesBurned, difficulty, date } =
        req.body;
      console.log("masuk");

      const findWorkout = await Workout.findByPk(id);

      if (!findWorkout) {
        throw { name: "WORKOUT_NOT_FOUND" };
      }

      const updateWorkout = await Workout.update(
        {
          name,
          type,
          duration,
          caloriesBurned,
          difficulty,
          date,
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({
        message: "Workout updated successfully",
      });
    } catch (error) {
      console.log(error, "error di UpdateWorkout");

      next(error);
    }
  }

  static async DeleteWorkout(req, res, next) {
    try {
      const { id } = req.params;

      const findWorkout = await Workout.findByPk(id);

      if (!findWorkout) {
        throw { name: "WORKOUT_NOT_FOUND" };
      }

      await Workout.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        message: "Workout deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  static async UpdateNutrition(req, res, next) {
    try {
      const { id } = req.params;

      const { name, calories, protein, carbs, fat, mealType, date } = req.body;

      const findNutrition = await Nutrition.findByPk(id);

      if (!findNutrition) {
        throw { name: "NUTRITION_NOT_FOUND" };
      }

      const updateNutrition = await Nutrition.update(
        {
          name,
          calories,
          protein,
          carbs,
          fat,
          mealType,
          date,
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({
        message: "Nutrition updated successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  static async DeleteNutrition(req, res, next) {
    try {
      const { id } = req.params;

      const findNutrition = await Nutrition.findByPk(id);

      if (!findNutrition) {
        throw { name: "NUTRITION_NOT_FOUND" };
      }

      await Nutrition.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        message: "Nutrition deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  static async UpdateBodyMeasurement(req, res, next) {
    try {
      const { id } = req.params;

      const { weight, bodyFatPercentage, muscleMass, date } = req.body;

      const findBodyMeasurement = await BodyMeasurement.findByPk(id);
      if (!findBodyMeasurement) {
        throw { name: "BODY_MEASUREMENT_NOT_FOUND" };
      }

      const updateBM = await BodyMeasurement.update(
        {
          weight,
          bodyFatPercentage,
          muscleMass,
          date,
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({
        message: "Body Measurement updated successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  static async DeleteBodyMeasurement(req, res, next) {
    try {
      const { id } = req.params;

      const findBodyMeasurement = await BodyMeasurement.findByPk(id);

      if (!findBodyMeasurement) {
        throw { name: "BODY_MEASUREMENT_NOT_FOUND" };
      }

      await BodyMeasurement.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        message: "Body Measurement deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  // static async EditUserProfile(req, res, next) {
  //   try {
  //     const { username } = req.params;

  //     const { username, age, gender, weight, height, fitnessGoal } = req.body;


  //   } catch (error) {
  //     next(error);
  //   }
  // }
}

module.exports = {
  Controller,
};
