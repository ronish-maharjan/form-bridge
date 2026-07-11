import { NextFunction, Request, Response } from "express";
import { JwtToken } from "../utils/jwt-token.js";
import { AuthenticationError } from "../errors/authentication.error.js";

const authenticateGuard = async (req:Request,res:Response,next:NextFunction)=>{
    const cookie = req.cookies; 
    const authToken = cookie["__secure-access-token"];
    if(!authToken){
        return next(new AuthenticationError({message:"Authentication failed."}))
    }else{
        try{
            const {id,email} = JwtToken.verifyToken(authToken) as {id:string,email:string};
            req.user = {id,email};
            next();
        }catch(err){
            res.clearCookie("__secure-access-token");
            return next(new AuthenticationError({message:"Authentication failed."}))
        }
    }

}

export {authenticateGuard};
