const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    getAllUsers
} = require("../controllers/authController");

// ...existing code...
const { protect, authorize } = require("../middleware/authMiddleWare");
// ...existing code...

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/users", protect, authorize("admin"), getAllUsers);

module.exports = router;