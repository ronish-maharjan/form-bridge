import { AppError, AppErrorInput, ErrorCodeType, OperationalErrorCode } from "./app.error.js";

class ValidationError extends AppError{
    readonly isOperational: boolean = true;
    readonly code:ErrorCodeType = OperationalErrorCode.VALIDATION_FAILED

    constructor(input:AppErrorInput){
        super(input);
    }
}


export {ValidationError};
