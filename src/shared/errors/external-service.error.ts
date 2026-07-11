import { AppError, AppErrorInput, ErrorCodeType, NonOperationalErrorCode } from "./app.error.js";

class ExternalServiceError extends AppError{
    readonly code: ErrorCodeType = NonOperationalErrorCode.EXTERNAL_SERVICE_ERROR;
    readonly isOperational: boolean = true;
    constructor(input:AppErrorInput){
        super(input);
    }
}

export {ExternalServiceError};
