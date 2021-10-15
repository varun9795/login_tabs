const ErrorHander = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const UserInfo = require("../models/userInfoModel");
const sendToken = require("../utils/jwtToken");


// Login User
exports.LoginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHander("Please Enter Email & Password", 400));
  }
 
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    console.log("wrong user");
    return next(new ErrorHander("Not exists email or password", 401));
  }

  
  // const isPasswordMatched = await user.comparePassword(password);

  if (user.password!=password) {
    return next(new ErrorHander("Invalid email or password", 401));
  }
  sendToken(user, 200, res);
});

//Create User Profile
exports.createUser = catchAsyncErrors(async (req, res, next) => {

 const {name, email,mobile,address} = req.body;

console.log(req.body)
const user = await UserInfo.create({
    name,
    email,
    mobile,
    address,
  });

  
  res.status(201).json({
    success: true,
    user,
  });
});

// Get All Users
exports.getUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await UserInfo.find();

  res.status(200).json({
    success: true,
    message:"User Created !!!!",
    users,
  });
});





// Delete User 
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await UserInfo.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});