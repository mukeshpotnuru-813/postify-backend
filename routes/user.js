const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const{body,validationResult} = require('express-validator');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = 'Rappa_rappa';


router.post('/register',[
    body('userName').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
],

async(req,res)=>{
    const errors = validationResult(req); //errors in vildation will be stored.

    if(!errors.isEmpty()){
       return res.status(400).json({error:errors.array()})
    }
    const {userName,email,password} = req.body;

    try{
        const existingUser = await User.findOne({email}); //checks whether user already exists.
        if(existingUser){
            return res.status(400).json("user already exists");
        }
        //if user doesnt exist hash the password.
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            userName,
            email,
            password:hashedPassword
        });
        const createdUser = await newUser.save();
        return res.status(200).json(createdUser);

    }
    catch(error){
        return res.status(400).json('unable to create user');
    }
}
);

router.post('/login',
    [
        body('email').isEmail().withMessage('Invalid email address'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    async (req,res) =>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({error:errors.array()});
        }
        const {email,password} = req.body;
        try{
            const user = await User.findOne({email});
            if(!user){
                return res.status(400).json('User email is invalid');
            }
            const isMatch = await bcrypt.compare(password,user.password); //User.password is hashed password and 'password' is entered password.
            if(!isMatch){
                return res.status(400).json('Invalid password');
            }
            const token = jwt.sign({id:user._id},JWT_SECRET,{expiresIn:'1h'})


            res.status(200).json({message:'Login successful',token});



        }
        catch (error) {
            res.status(400).json({error:`Failed to login: ${error.message}`}) 
        }
    }
)

module.exports = router;