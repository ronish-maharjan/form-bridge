import { AppError, AppErrorInput, ErrorCodeType, NonOperationalErrorCode } from "./app.error.js";

class DatabaseError extends AppError{
    readonly code: ErrorCodeType = NonOperationalErrorCode.DATABASE_ERROR;
    readonly isOperational: boolean = false;
    constructor(input:AppErrorInput){
        super(input);
    }
}

export {DatabaseError};
