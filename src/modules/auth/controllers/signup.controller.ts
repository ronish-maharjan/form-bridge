import { NextFunction, Request, Response } from "express";
import { SignupUsecase } from "../usecases/sign-up.usecase.js";

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
                if(result.success){
                    return res.status(201).json(result)
                }
                return res.status(400).json(result)
            }catch(err){
                console.log(err)
            }
    }
}

const signupUsecase = new SignupUsecase();
const signupController = new SignupController(signupUsecase);

export {signupController};
