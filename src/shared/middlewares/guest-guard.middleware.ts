import { NextFunction, Request, Response } from "express";
import { JwtToken } from "../utils/jwt-token.js";

const guestGuard = async(req:Request,res:Response,next:NextFunction)=>{
    const cookie = req.cookies["__access-token"];
    if(cookie){
        try{
            JwtToken.verify(cookie);
            // we need to change redirect in right way 
            return res.redirect("/api/v1/health");
        }catch(err){
            res.clearCookie("__access-token");
            return res.status(401).json("Unauthorized access");
        }
    }
    next();
}

export {guestGuard};
