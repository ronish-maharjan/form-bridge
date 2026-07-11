import { ErrorRequestHandler } from "express";      
import { AppError, NonOperationalErrorCode, NonOperationalErrorCodeType, OperationalErrorCodeType } from "../errors/app.error.js";

export const globalErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    console.log(err)

    if(err instanceof AppError){

        if(err.isOperational){

            const errorCode:OperationalErrorCodeType = err.code as OperationalErrorCodeType;

            switch(errorCode){
                case "RATE_LIMIT_EXCEEDED":
                    res.status(429).json({success:false,code:err.code,message:err.message});
                break;

                case "FORBIDDEN_ERROR":
                    res.status(403).json({success:false,code:err.code,message:err.message});
                break

                case "VALIDATION_ERROR":
                    res.status(400).json({success:false, code:err.code, message:err.message,errors:err.context?.issues});
                break;

                case "INVALID_CREDENTIALS":
                    res.status(429).json({success:false,code:err.code,message:err.message});
                break;

                case "CONFLICT_ERROR":
                    res.status(409).json({success:false,code:err.code,message:err.message});
                break

                case "RESOURCE_ALREADY_EXISTS":
                    res.status(409).json({success:false,message:err.message,error:err});
                break;

                case "RESOURCE_NOT_FOUND":
                    res.status(409).json({success:false,code:err.code,message:err.message});
                break;

                case "NOT_AUTHENTICATED":
                    res.status(401).json({success:false,code:err.code,message:err.message});
                break;

                default:
                    const _error:never = errorCode;
                    res.status(500).json({success:false,code:NonOperationalErrorCode.INTERNAL_SERVER_ERROR,message:"Internal server error."});
                    
            }

        }else{
            const errorCode:NonOperationalErrorCodeType = err.code as NonOperationalErrorCodeType;
            switch(errorCode){
                case "EXTERNAL_SERVICE_ERROR":
                    res.status(503).json({success:false,code:err.code,message:"Service temporarily unavailable."})
                break
            }
        }

    // for non operationals as well as unexpected errrors
    }else{
        res.status(500).json({success:false,code:NonOperationalErrorCode.INTERNAL_SERVER_ERROR,message:"Internal server error."});
    }
}
        
