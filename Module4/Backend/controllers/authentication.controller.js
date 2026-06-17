const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const userModel = require('../models/users.model');

//method: POST
//process: User registration
//route public route

const registerUser = async(req, res, next) => {
    try{
        const { username, email, password, role } = req.body;

        const userExist = await userModel.findOne({email});

        if(userExist) {
            return res.json({
                message : "User already exist"
            });
        }

        const hasedPwd = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            username,
            email,
            password: hasedPwd,
            role
        });

        await newUser.save();

        res.status(200).json({
            message : "User Created successfully"
        });

    }catch(err) {
        next(err);
    }
}

//method: Post
//process: login user and get JWT token
//route public 

const loginUser = async (req,res) => {
    try{
        const {email, password} = req.body;

        const user = await userModel.findOne({email});
        
        if(!user) {
            return res.status(404).json({
                message : "User not found"
            });
        }

        const isPwdMatch = await bcrypt.compare(password, user.password);
        
        if(!isPwdMatch) {
             return res.status(500).json({
                message : "Invalid Password"
            });
        };

        const token = await jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.status(200).json({
            message: "User LoggedIn",
            token,
            role: user.role
        });
    } catch(err) {
       next(err);
    }
}

module.exports = {registerUser, loginUser};