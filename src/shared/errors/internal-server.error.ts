import { AppError, AppErrorInput, ErrorCodeType, NonOperationalErrorCode } from "./app.error.js";

class InternalServerError extends AppError{
    readonly code: ErrorCodeType =NonOperationalErrorCode.INTERNAL_SERVER_ERROR;
    readonly isOperational: boolean = false;
    constructor(input:AppErrorInput){
        super(input);
    }
}

export {InternalServerError};
