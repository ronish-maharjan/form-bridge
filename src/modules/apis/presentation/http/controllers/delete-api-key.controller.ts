import { Request ,Response,NextFunction} from "express";
import { DeleteApiKeyUsecase } from "../../../usecases/delete-api-key.usecase.js";

class DeleteApiKeyController {
    readonly #deleteApiKeyUsecase:DeleteApiKeyUsecase;
    constructor(usecase:DeleteApiKeyUsecase){
        this.#deleteApiKeyUsecase = usecase;
    }

    public handle = async(req:Request,res:Response,next:NextFunction)=>{
            try{
                const userId = req.user?.id;
                const apiKeyId = req.params.id as string;
                const usecaseResult = await this.#deleteApiKeyUsecase.execute({userId,apiKeyId});
                if(!usecaseResult.ok){
                    throw usecaseResult.error;
                }
                return res.sendStatus(204);
            }catch(err){
                next(err);
            }
    }
}

export {DeleteApiKeyController};
