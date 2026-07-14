import { AppError, AppErrorInput, ErrorCodeType, OperationalErrorCode } from "./app.error.js";

class BadRequestError extends AppError{
    readonly isOperational: boolean = false;
    readonly code: ErrorCodeType = OperationalErrorCode.BAD_REQUEST
    constructor(input:AppErrorInput){
        super(input);
    }
}

export {BadRequestError};
