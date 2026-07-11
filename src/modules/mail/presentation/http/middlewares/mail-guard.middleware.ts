import { NextFunction, Request, Response } from "express";
import { pool } from "../../../../../configs/db-connection.js";

const mailGuard = async (req:Request,res:Response,next:NextFunction)=>{
    // check if there exist the apikey with that url domaiin 
    const data = req.body
    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({success:false,error:"Invalid request body"});
    };

    const apiKey = req.query.api_key;
    const originUrl = req.headers.origin;
    const isExist = await pool.query("select inbox_mail from users left join apis on users.id = apis.user_id where url = $1 and api_key=$2",[originUrl,apiKey]);
    if(!isExist.rowCount){
       return res.status(401).json({success:false,error:"Unauthorized"});
    }
    req.user = {inboxMail:isExist.rows[0].inbox_mail}
    next();
};

export {mailGuard}
