import { ErrorRequestHandler } from "express";      
import { AppError, NonOperationalErrorCode, NonOperationalErrorCodeType, OperationalErrorCodeType } from "../errors/app.error.js";
import { logger } from "../logger/logger.js";

export const globalErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    if (err instanceof SyntaxError && "body" in err) {
        return res.status(400).json({
            success: false,
            code: "BAD_REQUEST",
            message: "Request body contains invalid JSON."
        });
    }

    if(err instanceof AppError){

        if(err.isOperational){
            logger.warn(err);
            const errorCode:OperationalErrorCodeType = err.code as OperationalErrorCodeType;

            switch(errorCode){
                case "RATE_LIMIT_EXCEEDED":
                    return res.status(429).json({success:false,code:err.code,message:err.message});
                break;

                case "FORBIDDEN":
                    return res.status(403).json({success:false,code:err.code,message:err.message});
                break

                case "VALIDATION_FAILED":
                    return res.status(400).json({success:false, code:err.code, message:err.message,errors:err.context?.issues});
                break;

                case "INVALID_CREDENTIALS":
                    return res.status(401).json({success:false,code:err.code,message:err.message});
                break;

                case "CONFLICT":
                    return res.status(409).json({success:false,code:err.code,message:err.message});
                break

                case "RESOURCE_ALREADY_EXISTS":
                    return res.status(409).json({success:false,code:err.code,message:err.message});
                break;

                case "RESOURCE_NOT_FOUND":
                    return res.status(409).json({success:false,code:err.code,message:err.message});
                break;

                case "NOT_AUTHENTICATED":
                    return res.status(401).json({success:false,code:err.code,message:err.message});
                break;

                case "BAD_REQUEST":
                    return res.status(400).json({success:false, code:err.code, message:err.message})

                default:
                    const _error:never = errorCode;
                return res.status(500).json({success:false,code:NonOperationalErrorCode.INTERNAL_SERVER_ERROR,message:"Internal server error."});

            }

        }else{
            const errorCode:NonOperationalErrorCodeType = err.code as NonOperationalErrorCodeType;
            switch(errorCode){
                case "EXTERNAL_SERVICE_ERROR":
                    logger.error(err);
                return res.status(503).json({success:false,code:err.code,message:"Service temporarily unavailable."})

                break
            }
        }

        // for non operationals as well as unexpected errrors
    }else{
        logger.fatal(err)
        return res.status(500).json({success:false,code:NonOperationalErrorCode.INTERNAL_SERVER_ERROR,message:"Internal server error."});
    }
}

