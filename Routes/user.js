const {Router} = require("express")
const User = require("../Models/user")
const routes = Router()
 
routes.get("/test", (req,res)=>{
    res.send("server working fine")
})
 
routes.post("/register", async (req,res)=>{
    const user= new User({
        fname:"Visha",
        lname:"Pathak",
        email:"vishapathak11@gmail.com",
        password:"123456"
    })
     await user.save()
     res.json({
       "message":"user has been registered successfully completed" 
     })
})


module.exports=routes;