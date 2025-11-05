const { Schema, model } = require("mongoose");

let billSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        required:true,
    },
    title: {
        type: String,
        required: true,
        trim:true,
    },
    billNumber: {
        type: String,
        required: true,
        trim: true,
    },
     date: {
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
    total:{
        type: Number,
        require: true,
        trim: true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    
})
const Bill = model("bill",billSchema);
module.exports = Bill;