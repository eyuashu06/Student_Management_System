const asyncHandler = require("../middleware/asyncHandler");
const Course = require("../models/Course");

// Create new course

exports.createCourse = asyncHandler(async (req, res) => {
    const { title, description, instructor, price } = req.body;

    const course = await Course.create({
        title,
        description,
        instructor,
        price
    });

    res.status(201).json(course);
});

// Get all the courses

exports.getCourses = asyncHandler(async (req, res) => {
    const courses = await Course.find();
    res.json(courses);
});

//Get single courses

exports.getCourseById = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);

    if(!course){
        return res.status(404).json({
            message: "Course not found"
        });
    }
    res.json(course);
});

// Updaate Course

exports.updateCourse = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);

    if(!course){
        return res.status(404).json({
            message: "Course not found"
        });
    }
    course.title = req.body.title || course.title;
    course.description = req.body.description || course.description;
    course.instructor = req.body.instructor || course.instructor;
    course.price = req.body.price || course.price;

    const updateCourse = await course.save();
    
    res.json(updateCourse);
});

// Delete the course

exports.deleteCourse = asyncHandler(async (req, res) =>{
    const course = await Course.findById(req.params.id);

    if(!course){
        return res.status(404).json({
            message: "Course not found"
        });
    }

    await course.deleteOne();

    res.json({
        message: "course removed"
    });
});