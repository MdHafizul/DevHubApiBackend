const express = require("express");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

// Include other resource routers
const User = require("../models/User");
const advancedResults = require("../middleware/advancedResults");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
const { get } = require("mongoose");

// Re-route into other resource routers
router.use(protect);
router.use(authorize("admin"));
router.
    route("/")
        .get(advancedResults(User), getUsers)
        .post(createUser);

router.
    route("/:id")
        .get(getUser)
        .put(updateUser)
        .delete(deleteUser);

module.exports = router;
