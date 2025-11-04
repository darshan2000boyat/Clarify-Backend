const User = require("../Models/user")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function profileController(req,res){
    //1. Extract data from req.body
    const {email} =req.body
    //2. Find the user data from DB using data.email
    const user = await User.findOne({email})
    //3. Subtract the password from user data
    delete user.password
    //4. Send the final data to user as response 
    res.status(200).json({
        success: true,
        error: false,
        message: "Successfully found profile data",
        data: user
    })
}

async function loginController(req,res){
{
  try {
    const { email, password } = req.body;
    if (email === undefined) {
      res.status(403).json({
        success: false,
        error: true,
        message: "Email not defined",
      });
    }

    if (password === undefined) {
      res.status(403).json({
        success: false,
        error: true,
        message: "Password not defined",
      });
    }

    const user =  await User.findOne({ email });

    if (user != undefined) {
      const isPasswordMatched = await bcrypt.compare(password, user.password);
      if (isPasswordMatched) {
        const authToken = jwt.sign(
          {
            email: email,
          },
          "ThisIsMySecret"
        );
        res.status(200).json({
          success: true,
          error: false,
          message: "User has been logged in successfully",
          authToken,
          user,
        });
      }
    }
  } catch (error) {}
}
}
async function registerController(req, res){
    
  const { fname, lname, email, password, phoneNo } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  const user = new User({
    fname,
    lname,
    email,
    password: hashedPassword,
    phoneNo,
  });
  await user.save();

  res.status(200).json({
    success: true,
    error: false,
    message: "user has been registered successfully completed",
    user,
  });
}

module.exports={profileController,loginController,registerController}

