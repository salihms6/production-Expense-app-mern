
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({

    userid: {
        type: String,
        required: true,

        
    },
    amount: {
        type: Number,
        required: [true, "Amount is Required"]
    },
    type: {
        type: String,
        required: [true, "Type is Required"]
    },
    category: {
        type: String,
        required: [true, "Category is Required"]

    },
    refrence: {
        type: String,

    },
    description: {
        type: String,
        required: [true, "Discription is required"]
    },

    date: {
        type: Date,
        required: [true, "date is required"]
    },

}, { timestamps: true });

const TransactionModel = mongoose.model("Transactions", transactionSchema);

module.exports = TransactionModel ;