const mongoose = require('mongoose')
const validator = require("validator");


const userInfoSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please Enter your userName"],
        unique: true,
        validate: [validator.isAlphanumeric, "not an alphaNumeric"],
    },

    email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
    },

    mobile: {
    type:Number,
    required: [true, "Please Enter Your Mobile Number"],
    minLength: [10, "Mobile number should be of length 10"],
    },

    address: {
        type: String,
        required:[true,"Address"]
        
    }
    

});


module.exports=mongoose.model("UserInfo", userInfoSchema);