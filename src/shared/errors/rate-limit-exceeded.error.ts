import { AppError, ErrorCodeType, OperationalErrorCode } from "./app.error.js";

class RateLimitExceededError extends AppError{
    readonly isOperational: boolean = true;
    readonly code: ErrorCodeType = OperationalErrorCode.RATE_LIMIT_EXCEEDED;
    constructor(){
        super({message:"Too many requests."});
    }
}

export {RateLimitExceededError};
