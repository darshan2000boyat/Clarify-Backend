const {Router} = require("express")
const routes = Router()

routes.get("/test", (req,res)=>{
    res.send("server working fine")
})

module.exports=routes