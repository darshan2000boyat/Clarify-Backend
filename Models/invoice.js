const { Schema, model, isValidObjectId } = require("mongoose");
let invoiceSchema = new Schema({
    userId:{
        type: ObjectId,
        required:true,
    },
    title: {
        type: String,
        required: true,
        trim:true,
    },
    invoiceNumber: {
        type: String,
        required: true,
        trim: true,
    },
     date: {
        type: String,
        required: true,
        trim: true,
    },
     dueDate: {
        type: String,
        required: true,
        trim: true,
    },
    businessDetail: {
        name:{
            type: String,
            require: true,
            trim: true,
        },
         address:{
            type: String,
            require: true,
            trim: true,
        },
         city:{
            type: String,
            require: true,
            trim: true,
        },
         representative:{
            type: String,
            require: true,
            trim: true,
        },
    },
    clientDetails:{
         phone:{
            type: String,
            require: true,
            trim: true,
        },
         email:{
            type: String,
            require: true,
            trim: true,
        },
         name:{
            type: String,
            require: true,
            trim: true,
        }, 
        address:{
            type: String,
            require: true,
            trim: true,
        },
    },
    product:[
        {
          name:{
            type: String,
            require: true,
            trim: true,
        },
         sku:{
            type: String,
            require: true,
            trim: true,
        },
         quantity:{
            type: Number,
            require: true,
            trim: true,
        },
         unitPrice:{
            type: Number,
            require: true,
            trim: true,
        },
        },
    ],
    
})
const Invoice = model("invoice",invoiceSchema);
module.export = Invoice;