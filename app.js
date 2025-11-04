const Express = require("express")
const usersRoutes = require("./Routes/user")
const mongoose = require("mongoose");
const cors = require("cors")
const app = Express()

app.use(cors("*"))
app.use(Express.json())
app.use(usersRoutes)


const databaseURI="mongodb+srv://vishapathak21:admin_visha@clarify.oval6k2.mongodb.net/?retryWrites=true&w=majority&appName=Clarify"
mongoose.connect(databaseURI,{
    // useNewUrlParsar:true,
    //useUnifiedTopology:true
}).then(()=>{
    console.log("Database has been connected successfully")
}).catch((err)=>{
    console.log("There is an error occured while connecting to database", err.message)
})

app.listen(8000, ()=>{
    console.log("Server is runing on port",8000) 
})

