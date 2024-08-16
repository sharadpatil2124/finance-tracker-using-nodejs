const User = require('../models/userModel')
const jwt = require('jsonwebtoken');

//new user

async function addUser(req, res){
    newEmail = req.body.email ;
    console.log('shgdjhas',req.body);
    try {
        const userExists = await User.findOne({email : newEmail});
        if(userExists){
            res.status(200).send({message : 'User already exists'})
            console.log('Already exists');
        }
            const user = new User(req.body);
            console.log('#####');
            await user.save();
            res.status(201).send({message : 'Register successful',task: user})
        
        
    } catch (error) {
        res.status(400).send(error);
    }
}

//login 
async function getUser (req, res){
    console.log("*******/**",req.body);
    try {
        
        // const {email, password} = req.body;
        newEmail = req.body.email;
        newPassword = req.body.password;
        const user = await User.findOne({email:newEmail});
        console.log("***",);
        if(!user){
            console.log("***/");
            res.status(400).send({ error: 'Invalid login credentials'});
        }
        isMatch = await user.comparePassword(newPassword);
        if(!isMatch){
            return res.status(400).send({error : 'Password Incorrect'})
        }
        const token = jwt.sign({_id : user._id},'sharad',{expiresIn :'1h'});
        res.status(200).send({accessToken : token});

    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports ={
    addUser,
    getUser 
}