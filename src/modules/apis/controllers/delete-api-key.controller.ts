import { Request, Response } from "express";
import { DeleteApiKeyUsecase } from "../usecases/delete-api-key.usecase.js";

class DeleteApiKeyController {
    readonly #deleteApiKeyUsecase:DeleteApiKeyUsecase;
    constructor(usecase:DeleteApiKeyUsecase){
        this.#deleteApiKeyUsecase = usecase;
    }
    public handle = async(req:Request,res:Response)=>{
        try{
            const userId = req.user?.id;
            const apiKeyId = req.params.id;
            console.log(userId,apiKeyId)
            const result = await this.#deleteApiKeyUsecase.execute({userId,apiKeyId})
            if(!result.ok){
                throw result.error;
            }
            res.sendStatus(204);
        }catch(err){
            if(err instanceof Error){
                console.log(err)
                res.status(500).json({success:false,error:err.message})
            }
        }
    }
};

const deleteApiKeyUsecase = new DeleteApiKeyUsecase();
const deleteApiKeyController = new DeleteApiKeyController(deleteApiKeyUsecase);
export {deleteApiKeyController};
