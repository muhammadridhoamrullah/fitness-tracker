const {
  User,
  Workout,
  Nutrition,
  BodyMeasurement,
} = require("../models/index");

async function Authorization(req, res, next) {
  try {
    const { id } = req.params;
    const userLogin = req.user.id;
    console.log("masuk authorization", id, userLogin);

    const url = req.originalUrl.split("/");
    console.log("url", url);

    if (url.includes("user")) {
      const findUser = await User.findOne({
        where: {
          username: url[4],
        },
      });
      if (!findUser) {
        throw { name: "USER_NOT_FOUND" };
      }
      if (findUser.id !== userLogin) {
        throw { name: "FORBIDDEN" };
      }

      next();
    } else if (url.includes("workout")) {
      const findWorkout = await Workout.findByPk(id);
      if (!findWorkout) {
        throw { name: "WORKOUT_NOT_FOUND" };
      }
      if (findWorkout.UserId !== userLogin) {
        throw { name: "FORBIDDEN" };
      }
      next();
    } else if (url.includes("nutrition")) {
      const findNutrition = await Nutrition.findByPk(id);

      if (!findNutrition) {
        throw { name: "NUTRITION_NOT_FOUND" };
      }
      next();
    } else if (url.includes("bodyMeasurement")) {
      const findBodyMeasurement = await BodyMeasurement.findByPk(id);
      if (!findBodyMeasurement) {
        throw { name: "BODY_MEASUREMENT_NOT_FOUND" };
      }
      if (findBodyMeasurement.UserId !== userLogin) {
        throw { name: "FORBIDDEN" };
      }
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  Authorization,
};
