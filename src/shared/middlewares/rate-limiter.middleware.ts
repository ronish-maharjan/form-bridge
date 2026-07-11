import { Request ,Response,NextFunction} from "express";
import { redis } from "../../configs/redis-connection.js";
import { TokenBucket } from "../utils/token-bucket.js";
import { logger } from "../logger/logger.js";

const rateLimiter = ({bucketSize,fillRate,policy}:{bucketSize:number,fillRate:number,policy:string})=>{
    const tokenBucket = new TokenBucket({bucketSize,fillRate});
    return (async(req:Request,res:Response,next:NextFunction) =>{
        try{

            const ip = req.ip;
            const isExist = await redis.get(`user:${ip}:${policy}`)    
            if(!isExist){
                const bucket = JSON.stringify(tokenBucket.create());
                await redis.set(`user:${ip}:${policy}`,bucket);
            }else{
                const userBucket = isExist;
                logger.debug(userBucket);
                const updatedBucket = JSON.stringify(tokenBucket.update(JSON.parse(userBucket)));
                await redis.set(`user:${ip}:${policy}`,updatedBucket);
            }
            next();
        }catch(err){
            next(err);
        }

    })
}
export {rateLimiter};
