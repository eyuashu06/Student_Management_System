const express = require("express");
const router = express.Router();

const { enrollCourse, getMyCourses } = require("../controllers/enrollmentController");
const { protect } = require("../middleware/authMiddleWare");

router.post("/:courseId", protect, enrollCourse);
router.get("/my-courses", protect, getMyCourses);
router.get("/course/:courseId", protect, admin, getCourseStudents);

module.exports = router;
