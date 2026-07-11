import { NextFunction, Request, Response } from "express";
import { GetApiKeysUsecase } from "../../../application/usecases/get-api-keys.usecase.js";

class GetApikeysController { 
    readonly #getApiKeysUsecase:GetApiKeysUsecase;
    constructor(usecase:GetApiKeysUsecase){
        this.#getApiKeysUsecase = usecase;
    }
    public handle = async(req:Request,res:Response,next:NextFunction)=>{
        try {
            let id:string|undefined = req.user?.id;
            // fix this in future cause we are sure there will be id in the request becasue of the authentication guard 
            const result = await this.#getApiKeysUsecase.execute({id}); 
            if(!result.ok){
                throw result.error;
            }
            return res.status(200).json({success:true,data:result.data})
        } catch (err) {
            next(err);
        }
    };
}

export {GetApikeysController};
