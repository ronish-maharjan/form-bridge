import { AppError, AppErrorInput,ErrorCodeType, OperationalErrorCode} from "./app.error.js"

class ResourceNotFoundError extends AppError{
    readonly isOperational: boolean = true;
    readonly code: ErrorCodeType =OperationalErrorCode.RESOURCE_NOT_FOUND;
    constructor(input:AppErrorInput){
       super(input); 
    }
}

export {ResourceNotFoundError};
