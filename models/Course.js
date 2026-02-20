const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
    {
    title: {
        type: String,
        required: [true, "Course title is required"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Course description is required"]
    },
    instructor: {
        type: String,
        required: [true, "Instructor name is required"]
    },
    price: {
        type: Number,
        required: [true, "Course price is required"],
        min: 0
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Course",courseSchema);