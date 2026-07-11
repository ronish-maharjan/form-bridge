import { AppErrorInput,AppError, OperationalErrorCode, ErrorCodeType } from "./app.error.js";

class AuthenticationError extends AppError {
    readonly code:ErrorCodeType = OperationalErrorCode.NOT_AUTHENTICATED;
    readonly isOperational: boolean = true;
    constructor(input:AppErrorInput){
        super(input);
    }
}


export {AuthenticationError};
