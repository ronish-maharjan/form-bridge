import { NextFunction, Request ,Response} from "express";
import { pool } from "../../../../../configs/db-connection.js";
import { ForbiddenError } from "../../../../../shared/errors/forbidden.error.js";

const requireInboxMail = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        //check if the user have added inboxmail 
        const userId = req.user?.id;
        const hasInboxMail = await pool.query("select inbox_mail from users where id =$1",[userId]);
        if(!hasInboxMail.rows[0].inbox_mail){
            return next(new ForbiddenError({message:"Required inbox mail."}));
        }
        next();
    }catch(err){
        return next(err);
    }
}

export {requireInboxMail};
