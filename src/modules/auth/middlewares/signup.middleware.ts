import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const UserSignupSchema = z.object({
    email: z
    .string()
    .regex(/^[a-z][a-z0-9.]{3,}@gmail\.com$/, {
        message: "Invalid Gmail address",
    }),
    password: z
    .string()
    .trim()
    .min(8, { message: "Minimum password length is 8 characters" }),
});


const userSignupValidator = async (req:Request,res:Response,next:NextFunction)=>{
    const parsedResult = UserSignupSchema.safeParse(req.body); 
    if(!parsedResult.success){
        const errors = parsedResult.error.flatten().fieldErrors;
        res.status(400).json({
            success: false,
            errors,
        });
    }
    next();
}

export {userSignupValidator,UserSignupSchema};
