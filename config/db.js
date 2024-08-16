const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log('MongoDB connected')
    }catch(error){
        console.error(error.message);
    }
}

module.exports = {connectDB};