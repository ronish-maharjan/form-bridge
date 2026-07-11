import { NextFunction, Request, Response } from "express";
import { GetUserUsecase } from "../../../application/usecases/get-user.usecase.js";

class GetUserController { 
    readonly #getUserUsecase:GetUserUsecase;
    constructor(usecase:GetUserUsecase){
        this.#getUserUsecase = usecase;
    }
    public handle = async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const id = req.user.id;

            const result = await this.#getUserUsecase.execute({id}); 
            if(!result.ok){
                throw result.error;
            }
            return res.status(200).json({success:true,data:result.data})
        } catch (error) {
                next(error);
            }
    };
}

export {GetUserController};
