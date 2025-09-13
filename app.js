const Express = require("express")
const usersRoutes = require("./Routes/user")
const app = Express()

app.use(usersRoutes)

app.listen(8000, ()=>{
    console.log("Server is runing on port",8000)
})