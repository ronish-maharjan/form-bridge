import { AppError, AppErrorInput, ErrorCodeType, NonOperationalErrorCode } from "./app.error.js";

class DataCorruptionError extends AppError{
    readonly isOperational: boolean = false;
    readonly code: ErrorCodeType = NonOperationalErrorCode.DATA_CORRUPTED;
    constructor(input:AppErrorInput){
        super(input);
    }
}

export {DataCorruptionError};
