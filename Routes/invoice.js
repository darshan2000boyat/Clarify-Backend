const{Router} = require("express");
const invoivce = require("../Models/invoice");
const routes = Router();

routes.get("/create",(req,res) => {
    const { title, invoiceNumber, date, dueDate, businessDetail, clientDetails, product} = req.body;
})