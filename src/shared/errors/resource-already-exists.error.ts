import { AppError, AppErrorInput,ErrorCodeType, OperationalErrorCode} from "./app.error.js"

class ResourceAlreadyExistsError extends AppError{
    readonly isOperational: boolean = true;
    readonly code: ErrorCodeType =OperationalErrorCode.RESOURCE_ALREADY_EXISTS;
    constructor(input:AppErrorInput){
       super(input); 
    }
}

export {ResourceAlreadyExistsError};
