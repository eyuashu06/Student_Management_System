console.log("Course routes loaded");

const express = require('express');
const router = express.Router();

const {
    createCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse
} = require("../controllers/courseController");

const { protect, authorize } = require("../middleware/authMiddleWare");

router.route("/")
    .get(getCourses)
    .post(protect, authorize("admin"), createCourse);

router.route("/:id")
    .get(getCourseById)
    .put(protect, authorize("admin"), updateCourse)
    .delete(protect, authorize("admin"), deleteCourse);

router.get("/test", (req, res) => {
  res.send("Course route works");
});

module.exports = router;