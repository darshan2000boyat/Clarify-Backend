const {Router}=require("express")
const User1 = require("../Models/user");
const aapp = Router();
//const routes = require("./user");
aapp.get("/test2" , (req,res)=>{
    res.send("server is working fine ")
})

aapp.post("/login", async (req,res)=>{
     const {email} = req.body;
     try{
        const user1 =await User1.findOne({email});
        if (user1){
            res.status(200).json({success:true,user1});
        }
        else{
            res.status(404).json({success:false,message:"user not found"});
            const newUser1 = new User1(user1) 
            console.log(newUser1);
            await newUser1.save()
            res.json({"message": "creaded"})
        }
     }
     catch(err){
        res.status(500).json({success:false,message:"server error"});
     }
        // console.log(user1);
        //  const newUser1 = new User1(user1) 
        //  console.log(newUser1);
        //   await newUser1.save()
    // res.json({
    //     "message":" running on port 8000"
    // })
})
module.exports = aapp;