const { Controller } = require("../controllers/controller");
const { authentication } = require("../middlewares/authentication");
const { Authorization } = require("../middlewares/authorization");
const { errorHandler } = require("../middlewares/errorHandling");

const router = require("express").Router();

router.post("/register", Controller.Register);
router.post("/login", Controller.Login);

router.use(authentication);

// Workouts
router.post("/workout", Controller.DoWorkout);
router.get("/workouts", Controller.GetAllWorkouts);

router.put("/workout/:id", Authorization, Controller.UpdateWorkout);
router.delete("/workout/:id", Authorization, Controller.DeleteWorkout);

// Nutrition
router.post("/nutrition", Controller.AddNutrition);
router.get("/nutritions", Controller.GetAllNutrition);

router.put("/nutrition/:id", Authorization, Controller.UpdateNutrition);
router.delete("/nutrition/:id", Authorization, Controller.DeleteNutrition);

// BodyMeasurements
router.post("/bodyMeasurement", Controller.AddBodyMeasurement);
router.get("/bodyMeasurements", Controller.GetAllBodyMeasurements);

router.put(
  "/bodyMeasurement/:id",
  Authorization,
  Controller.UpdateBodyMeasurement
);
router.delete(
  "/bodyMeasurement/:id",
  Authorization,
  Controller.DeleteBodyMeasurement
);

// Users
router.get("/user/profile", Controller.GetUserProfile);
// router.get(
//   "/user/profile/edit/:username",
//   Authorization,
//   Controller.EditUserProfile
// );

// Error Handler
router.use(errorHandler);

module.exports = {
  router,
};

// Public Endpoints:
// POST /register
// POST /login

// Authentication Required Endpoints:
// GET /workouts
// POST /workouts
// GET /nutrition
// POST /nutrition
// GET /measurements
// POST /measurements
// GET /users/profile

// Authorization Required Endpoints:
// User can only access their own data

// PUT /workouts/:id
// DELETE /workouts/:id
// PUT /nutrition/:id
// DELETE /nutrition/:id
// PUT /measurements/:id
// DELETE /measurements/:id
