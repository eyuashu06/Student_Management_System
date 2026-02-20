// models/User.js - COMPLETE FIXED VERSION
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is Required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is Required"],
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please use a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is Required"],
        minlength: 6
    },
    role: {
        type: String,
        enum: ["student", "admin"],
        default: "student"
    }
}, { timestamps: true });

// ✅ FIXED: Hash Password Before saving - NO 'next' parameter
userSchema.pre("save", async function() {
    // Only hash if password is modified
    if (!this.isModified("password")) {
        return;  // Just return, don't call next()
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    // No need to call next() - async middleware resolves automatically
});

// ✅ Password Comparison Method
userSchema.methods.matchPassword = async function(enteredPassword) {
    try {
        return await bcrypt.compare(enteredPassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = mongoose.model("User", userSchema);