import { NextFunction, Request, Response } from "express";
import { SignupUsecase } from "../../../application/usecases/sign-up.usecase.js";

class SignupController {
    readonly #signupUsecase:SignupUsecase;

    constructor(usecase:SignupUsecase){
            this.#signupUsecase = usecase;
    }

    public handle = async (req:Request,res:Response,next:NextFunction)=>{
            try{
                const email = req.body.email;
                const password = req.body.password;
                const result = await this.#signupUsecase.execute({email,password})
                if(result.ok){
                    return res.status(201).json({success:true})
                }
                throw result.error;
            }catch(err){
                next(err)
            }
    }
}


export {SignupController};
