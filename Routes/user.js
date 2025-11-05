const { Router } = require("express");
const { profileController, loginController, registerController } = require("../Controllers/user.controller");
const verifyToken = require("../Middlewares/middleware");
const routes = Router();

routes.get("/test", (req, res) => {
  res.send("server working fine");
});

routes.post("/register", registerController);

routes.post("/login", loginController);

routes.get("/profile", verifyToken, profileController);

module.exports = routes;
