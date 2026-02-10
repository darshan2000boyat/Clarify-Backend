const{Router} = require("express");
const Invoice = require("../Models/invoice");
const { invoiceController } = require("../Controllers/invoice.controller");
const routes = Router();

routes.get("/create", invoiceController)
module.exports=routes;