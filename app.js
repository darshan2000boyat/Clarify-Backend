const Express = require("express")
const usersRoutes = require("./Routes/user")
const mongoose = require("mongoose");
const app = Express()

app.use(usersRoutes)

const databaseURI="mongodb://localhost:27017/clarify"
mongoose.connect(databaseURI,{
    // useNewUrlParsar:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Database has been connected successfully")
}).catch((err)=>{
    console.log("There is an error occured while connecting to database", err.message)
})

app.listen(8000, ()=>{
    console.log("Server is runing on port",8000) 
})