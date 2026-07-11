import { AppError, ErrorCodeType ,AppErrorInput, OperationalErrorCode} from "./app.error.js";

class ConflictError extends AppError{
    readonly code: ErrorCodeType=OperationalErrorCode.CONFLICT_ERROR;
    readonly isOperational: boolean =true;
    constructor(input:AppErrorInput){
        super(input);
    }
}

export {ConflictError};
