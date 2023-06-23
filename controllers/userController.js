import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

export const authUser = asyncHandler(async (req,res)=>{
   try{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    await user.matchPassword(password)
    generateToken(res,user._id);
    res.json({
        _id:user._id,
        name:user.name,
        email:user.email
    });
   }catch(err){
    res.status(401).json({error:err.message});
   }
});

export const registerUser = asyncHandler(async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        await User.findOne({email});
        const user = await User.create({
            name,
            email,
            password
        });
        generateToken(res, user._id);
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
        });
    }catch(err){
        res.status(400).json({error:err.message});
    }
});

export const logoutUser = asyncHandler(async(req,res)=>{
    try{
        res.cookie('jwt','',{
            httpOnly:true,
            expires:new Date(0),
        });
        res.status(200).json({message:'logged out'});
    }catch(err){
        res.status(400).json({error:err.message});
    }
});

export const getUserProfile = asyncHandler(async(req,res)=>{
    try{
        if (req.user) {
            res.json({
              _id: req.user._id,
              name: req.user.name,
              email: req.user.email,
            });
        }
    }catch(err){
        res.status(404).json({error:err.message});
    }
});

export const updateUserProfile = asyncHandler(async(req,res)=>{
    try{
        const user = await User.findById(req.user._id);
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
        
            if (req.body.password) {
              user.password = req.body.password;
            }
        
            const updatedUser = await user.save();
        
            res.json({
              _id: updatedUser._id,
              name: updatedUser.name,
              email: updatedUser.email,
            });
        } 
    }catch(err){
        res.status(404).json({error:err.message});
    }
})