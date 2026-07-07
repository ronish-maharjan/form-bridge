import { NextFunction, Request, Response } from "express";
import { JwtToken } from "../utils/jwt-token.js";

const authenticateGuard = async (req:Request,res:Response,next:NextFunction)=>{
    const cookie = req.cookies; 
    const authToken = cookie["__access-token"];
    if(!authToken){
        return res.status(401).json({success:false,message:"Unauthorized access"})
    }else{
        try{
            const {id,email} = JwtToken.verify(authToken) as {id:string,email:string};
            req.user = {id,email};
            next();
        }catch(err){
            console.log(err)
            return res.status(401).json({success:false,message:"Unauthorized access"})
        }
    }

}

export {authenticateGuard};
