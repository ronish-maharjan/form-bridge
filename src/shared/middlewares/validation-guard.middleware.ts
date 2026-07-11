import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { ValidationError } from "../errors/validation.error.js";
import { ZodErrorFormatter } from "../utils/zod-error-formatter.js";

class ValidationGuard {
    private constructor() {}
    static validate(schema: z.ZodSchema) {
        return async (req: Request, res: Response, next: NextFunction) => {
            const parsedResult = schema.safeParse(req.body);
            if (!parsedResult.success) {
                return next(
                    new ValidationError({ message: "Validation failed.", options: { context: { issues: ZodErrorFormatter.format(parsedResult.error) }}})
                );
            }

            return next();
        };
    }

}
export { ValidationGuard };
