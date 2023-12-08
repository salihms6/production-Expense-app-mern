const TransactionModel = require("../models/TransactionModel");
const moment = require("moment");

const getAllTransaction = async (req, res)=>{
    try {
        const {frequency, selectedDate, type} = req.body
        const transactions = await TransactionModel.find({
            ...(frequency !== "custom" ? {
            date: {
                $gt : moment().subtract(Number(frequency),"d").toDate(),
            },
        } : {
            date: {
                $gte: selectedDate[0],
                $lte: selectedDate[1],
            }
        } ),
            userid: req.body.userid,
        ...(type !== "all" && { type }),
        });
        res.status(200).json(transactions);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
        
    }
};
const deleteTransaction = async(req,res) =>{
    try {
        await TransactionModel.findOneAndDelete(
            {_id:req.body.transactionsId}
        )
        res.status(200).send("Transaction Delete Success")
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
};


const editTransaction = async (req,res) => {
    try {
        await TransactionModel.findOneAndUpdate(
            {_id: req.body.transactionsId},
            req.body.payload
        );
        res.status(200).send("Edit successfull");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};


const addTransaction = async (req, res) => {
    try {
        const newTransaction = new TransactionModel(req.body);
        await newTransaction.save();
        res.status(201).send("Transaction Created");
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};

module.exports ={getAllTransaction,addTransaction,editTransaction,deleteTransaction};