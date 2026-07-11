type AppErrorInput = {
    message: string;
    options?: {
        cause?: unknown;
        context?: Record<string, unknown>;
    };
};

const OperationalErrorCode = {
    RESOURCE_NOT_FOUND: "RESOURCE_NOT_FOUND",
    NOT_AUTHENTICATED: "NOT_AUTHENTICATED",
    RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED",
    RESOURCE_ALREADY_EXISTS: "RESOURCE_ALREADY_EXISTS",
    VALIDATION_ERROR: "VALIDATION_ERROR",
    INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
    CONFLICT_ERROR: "CONFLICT_ERROR",
    FORBIDDEN_ERROR: "FORBIDDEN_ERROR",
} as const;

type OperationalErrorCodeType = typeof OperationalErrorCode[keyof typeof OperationalErrorCode];

const NonOperationalErrorCode = {
    DATABASE_ERROR: "DATABASE_ERROR",
    DATA_CORRUPTED: "DATA_CORRUPTED",
    EXTERNAL_SERVICE_ERROR: "EXTERNAL_SERVICE_ERROR",
    INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
} as const;

type NonOperationalErrorCodeType = typeof NonOperationalErrorCode[keyof typeof NonOperationalErrorCode];

type ErrorCodeType = OperationalErrorCodeType | NonOperationalErrorCodeType;

abstract class AppError extends Error {
    abstract readonly code:ErrorCodeType;
    abstract readonly isOperational: boolean;

    readonly context?: Record<string, unknown>;

    constructor(input: AppErrorInput) {
        super(input.message, {
            cause:
                input.options?.cause instanceof Error
                    ? input.options.cause
                    : undefined,
        });

        this.context = input.options?.context;
    }
}

export {AppError,AppErrorInput,OperationalErrorCode,NonOperationalErrorCode,ErrorCodeType, NonOperationalErrorCodeType,OperationalErrorCodeType};
