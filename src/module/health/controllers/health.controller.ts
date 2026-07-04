import { Request, Response } from "express";
import { pool } from "../../../configs/db-connection.js";

class HealthController {

   public health = async (req:Request,res:Response)=>{
        return res.json({success:true,timeStamp: new Date()})
   } 

   public ready = async(req:Request,res:Response)=>{
       try{
            await pool.query("select 1");
            return res.json({success:true})
       }catch(e){
            return res.json({success:false})
       }
   }
}

const healthController = new HealthController();

export {healthController};
