const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const asyncHandler = require("../middleware/asyncHandler");

// Registery System

exports.registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;

    // checking if the user exists
    const userExists = await User.findOne({ email });
    if(userExists){
        return res.status(400).json({
            message: "User already Exists"
        });
    }

    //create the User
    const user = await User.create({
        name,
        email,
        password,
        role
    });

    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role)
    });
});

// Login User

exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            role: user.role,
            email: user.email,
            token: generateToken(user._id, user.role)
        });
    }
    else{
        res.status(401).json({
            message: "Invalid Email or Password"
        });
    }
});

// Get all the users , get /api/auth/users , access have only the admin

exports.getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password");

    res.json(users);
});