const express = require('express');
const bodyparser = require('body-parser');
require('dotenv').config();
const MongoDB = require('./config/db');
const routesAPI = require('./routes/api');
const app = express()


PORT = 6001;

app.use(express.json());
app.use(bodyparser.json());

app.use('/api',routesAPI)

MongoDB.connectDB();

app.listen(PORT,()=>{
    console.log("server Started",PORT);
})