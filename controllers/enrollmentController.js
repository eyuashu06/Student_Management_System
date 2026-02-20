const asyncHandler = require("../middleware/asyncHandler");
const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

// Enroll in course
exports.enrollCourse = asyncHandler(async (req, res) => {

  const course = await Course.findById(req.params.courseId);

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  // Check if already enrolled
  const alreadyEnrolled = await Enrollment.findOne({
    user: req.user._id,
    course: course._id
  });

  if (alreadyEnrolled) {
    return res.status(400).json({
      message: "Already enrolled in this course"
    });
  }

  const enrollment = await Enrollment.create({
    user: req.user._id,
    course: course._id
  });

  res.status(201).json({
    message: "Successfully enrolled",
    enrollment
  });
});

// Get looged in studnets enrolled courses

exports.getMyCourses = asyncHandler(async (req, res) => {
    const enrollments = await Enrollment.find({
        user: req.user._id
    }).populate("course");

    res.status(200).json({
        count: enrollments.length,
        enrollments
    });
}); 

// Get all students enrolled in a specific course (Admin only)
exports.getCourseStudents = asyncHandler(async (req, res) => {

  const courseId = req.params.courseId;

  const enrollments = await Enrollment.find({ course: courseId })
    .populate("user", "name email")
    .populate("course", "title");

  res.status(200).json({
    count: enrollments.length,
    enrollments
  });
});