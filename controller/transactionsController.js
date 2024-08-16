const Transactions = require('../models/transactionsModel');


async function addTrans(req, res){
    console.log("req.body get Transactions****",req.body);
    
    try{
        const newtrans = new Transactions(req.body);

        const result = await newtrans.save();
        res.status(200).send({message : "Transactions added successfully",task : result});

    }catch (error){
        res.status(500).send(error);
    }
}



async function getAllTrans(req, res){
    console.log("*********")
    try {
        result = await Transactions.find({},{__v:0});
        console.log(result);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function updateTrans(req,res){
    console.log("Update req.body.params.id",req.params.id);
    console.log("update req.body",req.body);
    try {
    const newtrans = await Transactions.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        });
    if (!newtrans){
        res.status(400).send({message:"Transactions not found"});
    }
    res.status(200).send({message : "Transactions updated",task : newtrans});
        
    } catch (error) {
        res.status(500).send(error);
    }
}

async function deleteTrans(req,res){
    console.log("req.params.id",req.params.id);
    // ID = req.params.id;
    try {
        const newtrans = await Transactions.findByIdAndDelete(req.params.id);
        if (!newtrans){
            res.status(400).send({ message : "Transactions not found"});
        }else{
        res.send({task : newtrans, message : "Transactions deleted"});
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

// async function reportTrans(req, res){
//     console.log("*********")

//     try {
//         result = await Transactions.find({},{__v:0});
//         console.log(result);
//         res.status(200).send(result);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// }

// async function reportTrans(req,res){

//     try{
//         const {startDate, endDate} = req.query;

//         if(!startDate || !endDate){
//             return res.status(400).send('start date and end date are required');
//         }
//     const report = Transactions.reduce(
//         (acc,Transactions) =>{
//             if (Transactions.type === 'income'){
//                 acc.income+= Transactions.amount;
//             } else if (Transactions.type === 'expense'){
//                 acc.expenses += Transactions.amount;
//             }
//             return acc;
//         },
//     );

//     report.balance = report.income - report.expenses;
//     res.status(200).json(report);
//     } catch(error){
//         res.status(500).send(error);
//     }
// }

async function reportTrans (req,res){
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    try {
        if (!startDate || !endDate) {
            return res
              .status(400)
              .send({ error: "Startdate and Enddate is requires" });
          }
          const start = new Date(startDate);
          const end = new Date(endDate);
          const transaction = await Transactions.find({
            date: { $gte: start, $lte: end },
          });
        
          res.status(200).json(transaction);
       

          
    } catch (error) {
        res.status(500).send(error);   
    }
}



module.exports ={
    addTrans,
    getAllTrans,
    updateTrans,
    deleteTrans,
    reportTrans
}
