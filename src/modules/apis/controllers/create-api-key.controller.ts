import { NextFunction, Request, Response } from "express";
import { CreateApiKeyUsecase } from "../usecases/create-api-key.usecase.js";

class CreateApiKeyController {
    readonly #createApiKeyUsecase:CreateApiKeyUsecase;
    constructor(usecase:CreateApiKeyUsecase){
        this.#createApiKeyUsecase = usecase; 
    }

    public handle = async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const id = req.user?.id; 
            const url = req.body.url
            const result = await this.#createApiKeyUsecase.execute({id,url});
            if(!result.ok){
                throw result.error;
            }
            return res.status(201).json({success:true,data:result.data});
        }catch(e){
            console.log(e)
            return res.status(500).json({success:false,error:"Internal server errror"});
        }

    }
};

const createApiKeyUsecase = new CreateApiKeyUsecase();
const createApiKeyController = new CreateApiKeyController(createApiKeyUsecase);

export {createApiKeyController};
