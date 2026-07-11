import { AppError, AppErrorInput, ErrorCodeType, OperationalErrorCode } from "./app.error.js";

class InvalidCredentialsError extends AppError{
    readonly code: ErrorCodeType = OperationalErrorCode.INVALID_CREDENTIALS;
    readonly isOperational: boolean = true;
    constructor(input:AppErrorInput){
        super(input)
    }
}

export {InvalidCredentialsError};
