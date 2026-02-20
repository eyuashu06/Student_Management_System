const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Enrollement", enrollmentSchema);