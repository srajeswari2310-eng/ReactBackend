const mongoose = require('mongoose');
const { recompileSchema } = require('../../../../JWT_class4/Backend/models/User');

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    role : {
        type: String,
        enum:["admin", "user", "guest"],
        default: "user"
    }
},
{
    timestamps : true // used to record timestamp
});

const User = mongoose.model("users" , userSchema);

module.exports = User;