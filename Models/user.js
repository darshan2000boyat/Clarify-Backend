const { Schema, model } = require("mongoose");

let userSchema = new Schema({
  fname: {
    type: String,
    required: true,
    trim: true,
  },
  lname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6 
  },
  phoneNo: {
    type: String,
    require : true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const User = model("user", userSchema);//yeh vo User jis me apan model store kar rhe hai 
module.exports = User;
