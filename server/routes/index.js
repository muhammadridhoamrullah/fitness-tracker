const { Controller } = require("../controllers/controller");
const { errorHandler } = require("../middlewares/errorHandling");

const router = require("express").Router();

router.post("/register", Controller.Register);
router.post("/login", Controller.Login);

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
