import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

export const protect = asyncHandler(async(req,res,next)=>{
    let token;
    try {
        token = req.cookies.jwt;
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select('-password');
        next();
    }catch(err){
        res.status(401).json({error:err.message});
    }
});