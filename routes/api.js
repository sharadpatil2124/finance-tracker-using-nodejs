const express = require("express");

const userController = require('../controller/userController');
const transactionsController = require('../controller/transactionsController');
const authorise = require("../authorise/authorise");


const userRouter = express.Router();


userRouter.post('/addTrans',authorise,transactionsController.addTrans);
// http://localhost:6001/api/addTrans
userRouter.get('/getAllTrans',authorise,transactionsController.getAllTrans);
// http://localhost:6001/api/getAllTrans
userRouter.put('/updateTrans/:id',authorise,transactionsController.updateTrans);
// http://localhost:6001/api//updateTrans/:id
userRouter.delete('/delete/:id',authorise,transactionsController.deleteTrans);
// http://localhost:6001/api/delete/:id
userRouter.get('/reportTrans',authorise,transactionsController.reportTrans);
// http://localhost:6001/api/reportTrans

// userRouter.get('/getByDate');


//user

userRouter.post('/register',userController.addUser);
//http://localhost:6001/api/register
userRouter.post('/login',userController.getUser);
//http://localhost:6001/api/login




// userRouter.get('/getProductsWithAuth',authorise,userController.);
// //http://localhost:5005/api/getProductsWithAuth







module.exports = userRouter;
