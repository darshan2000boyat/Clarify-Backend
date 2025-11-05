    const{Router} = require("express");
    const Invoice = require("../Models/invoice");
    const User = require("../Models/user")
    const routes = Router();
    async function invoiceController(req,res){
    try {
    const { title, invoiceNumber, date, dueDate, businessDetail, clientDetails, product} = req.body;
    const invoiceDate = new Date(date);
    const invoiceDuedate = new Date(dueDate);
    const {email} = req.body
    if(invoiceDate.toString()==="Invalid Date" || invoiceDate.toString()==="invalid date" ){
        res.status(400).json({
            success:false,
            error: true,
            message: "Please enter the valid date Ex-01/01/2026"
        })
        if(invoiceDuedate > invoiceDate){
            res.status(400).json({
                success:true,
                error:true,
                message:"Invalid date"
            })
        }
    }
    const user = await User.findOne({email});
    if (email == user.email){
        const authToken = jwt.sign(
            {
            email:email,
        },
        "My secret");
        res.status(200).json({
            success:true,
            error:false,
            message:"generate your invoices"
        })
    }
    const invoice = new Invoice({
        userId,
        title,
        invoiceNumber,
        invoiceDate,
        date,
        dueDate,
        businessDetail,
        clientDetails,
        product
    })
    const newinvoice = {...create}

    
    await invoice,newinvoice.save();
    
    res.status(200).json({
        success: true,
        message: "their is the invoivceof user",
        error: false,
        invoice,
    });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: `error invalid user ${error};
            }`
        })
    }
}
module.exports={invoiceController}