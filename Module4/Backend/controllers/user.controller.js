const userModel = require('../models/users.model');


//method: Get
//process: get all users
//route Only for admin

const getAllUser = async (req, res, next) => {
    
    try{
   
    const users = await userModel.find();

    res.status(200).json(users);
    } catch(err) {
       next(err);
    }
}

//method: Get
//process: get all users
//route Only for admin

const getUserById = async (req, res, next) => {
    
    try{
   
    const user = await userModel.findById(req.params.id);

    res.status(200).json(user);
    } catch(err) {
       next(err);
    }
}


//method: put
//process: update user
// route only for admin

const updateUser = async (req, res, next) => {
    try{
       
        const updateUser = await userModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true, // upadtes only the edited one
                runValidators: true //used to check the validators
            }
        );

        if(!updateUser) {
            res.status(404).json({
                success: false,
                message : "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User Updated"
        });

    }  catch(err) {
       next(err);
    }
}

//method: delete
//process: Delete user
// route only for admin

const deleteUser = async (req, res,next) => {
    try{
       

        const deleteUser = await userModel.findByIdAndDelete(
            req.params.id          
        );

        if(!deleteUser) {
            res.status(404).json({
                success: false,
                message : "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User Deleted"
        });

    }  catch(err) {
       next(err);
    }
}

module.exports = {getAllUser, getUserById, updateUser, deleteUser};

