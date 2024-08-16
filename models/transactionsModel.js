const mongoose = require('mongoose');

const transactionsSchema = mongoose.Schema({
    amount : {type : Number},
    category : {type : String, required : false},
    type:{ type : String,enum : ["INCOME","EXPENSE"],required : true},
    date:{ type: Date}
})

const Transactions = mongoose.model("Transactions", transactionsSchema);
module.exports = Transactions;

// {
//     "amount" : 1000,
//     "category" : "asdsd",
//     "type": "INCOME"
//      "date":"2024-04-25"
// }