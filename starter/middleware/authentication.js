const jwt=require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');
const User=require('../models/User');

const auth=async(req,res,next)=>{
    const authToken=req.headers.authorization;
        if(!authToken || !authToken.startsWith('Bearer')){
            throw new UnauthenticatedError('authentication invalid');
        }
    
        const token=authToken.split(' ')[1];
        try {
            const payload=jwt.verify(token,process.env.JWT_SECRET);
            req.user={userId:payload.userId,name:payload.name};
            next();
        } catch (error) {
            throw new UnauthenticatedError('authentication invalid');        
        }
}

module.exports=auth;