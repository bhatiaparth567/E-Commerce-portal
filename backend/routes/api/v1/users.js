const express = require("express");
const router = express.Router();

const usersController = require("../../../controllers/api/v1/users_api");
const protect = require("../../../middleware/authMiddleware");

router.post("/login", usersController.authUser);
router.get("/profile", protect.protect, usersController.getUserProfile);
router.put("/profile", protect.protect, usersController.updateUserProfile);
router.post("/", usersController.registerUser);
router.get("/", protect.protect, protect.admin, usersController.getUsers);
router.delete(
  "/:id",
  protect.protect,
  protect.admin,
  usersController.deleteUser
);
module.exports = router;
