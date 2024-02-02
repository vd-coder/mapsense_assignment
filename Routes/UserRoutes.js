const express = require('express');
const jwt = require('jsonwebtoken');
const secretKey=process.env.SECRET_KEY;
const router=express.Router();
const User=require('../models/user');

router.post('/signup',async (req,res)=>{
    
    if(!req.body.email||!req.body.password)
    {
        return res.status(400).json({message:'Username/Password required'});
    }
    const email=req.body.email;
    const password=req.body.password;
    const existingUser=await User.findOne({email:email});
    if(existingUser)
    {
        return res.status(409).json({message:"User Already exists"});
    }
    const user= new User({email:email,password:password});
    await user.save();
    const token = jwt.sign({ email: user.email }, secretKey);
    return res.status(200).json({token:token,message:'User Created'});
})

router.post('/login',async(req,res)=>{
    if(!req.body.email||!req.body.password)
    {
        return res.status(400).json({message:'Username/Password required'});
    }
    const email=req.body.email;
    const password=req.body.password;
    const user=await User.findOne({email:email});
    if(!user||user.password!=password)
    {
        return res.status(401).json({message:'Incorrect username or password'});
    }

    const token = jwt.sign({ email: user.email }, secretKey);
    return res.status(200).json({token:token,message:'Logged In'});
})

module.exports=router;