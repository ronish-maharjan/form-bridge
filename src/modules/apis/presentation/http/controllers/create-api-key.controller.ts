import { NextFunction, Request, Response } from "express";
import { CreateApiKeyUsecase } from "../../../application/usecases/create-api-key.usecase.js";

class CreateApiKeyController {
    readonly #createApiKeyUsecase:CreateApiKeyUsecase;
    constructor(usecase:CreateApiKeyUsecase){
        this.#createApiKeyUsecase = usecase; 
    }

    public handle = async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const userId = req.user?.id; 
            const url = req.body.url
            const result = await this.#createApiKeyUsecase.execute({userId,url});
            if(!result.ok){
                throw result.error;
            }
            return res.status(201).json({success:true,data:result.data});
        }catch(e){
            next(e);
        }

    }
};

export {CreateApiKeyController};
