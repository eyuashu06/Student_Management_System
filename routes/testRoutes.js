const express = require("express");
const { protect,authorize } = require("../middleware/authMiddleWare");
const router = express.Router();

router.get("/profile", protect, (req, res) => {
    res.json({
        message: "protected profile route",
        user: req.user
    });
});

router.get("/admin", protect, authorize("admin"), (req, res) => {
    res.json({
        message: "admin only routes"
    });
});

module.exports = router;
