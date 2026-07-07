import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { ZodErrorFormatter } from "../utils/zod-error-formatter.js";

class ValidationGuard {
    private constructor() {}
    static validate(schema: z.ZodSchema) {
        return (req: Request, res: Response, next: NextFunction) => {
            const parsedResult = schema.safeParse(req.body);
            if (!parsedResult.success) {
                const errors = ZodErrorFormatter.format(parsedResult.error);
                return res.status(400).json({
                    success: false,
                    errors,
                });
            }

            next();
        };
    }
}

export { ValidationGuard };
