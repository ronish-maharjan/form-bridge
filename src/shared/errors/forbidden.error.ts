import { AppError, AppErrorInput,  ErrorCodeType, OperationalErrorCode } from "./app.error.js";

class ForbiddenError extends AppError{
    readonly code: ErrorCodeType = OperationalErrorCode.FORBIDDEN_ERROR;
    readonly isOperational: boolean =true;
    constructor(input:AppErrorInput){
        super(input);
    }
}

export {ForbiddenError};
