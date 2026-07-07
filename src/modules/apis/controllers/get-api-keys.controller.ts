import { NextFunction, Request, Response } from "express";
import { GetApiUsecase } from "../usecases/get-apis.usecase.js";

class GetApisController { 
    readonly #getApiUsecase:GetApiUsecase;
    constructor(usecase:GetApiUsecase){
        this.#getApiUsecase = usecase;
    }
    public handle = async(req:Request,res:Response,next:NextFunction)=>{
        try {
            let id:string|undefined = req.user?.id;
            // fix this in future cause we are sure there will be id in the request becasue of the authentication guard 
            const result = await this.#getApiUsecase.execute({id}); 
            if(!result.ok){
                throw result.error;
            }
            return res.status(200).json({success:true,data:result.data})
        } catch (error) {
            next(error);
        }
    };
}

const getApisUsecase = new GetApiUsecase();
const getApisController = new GetApisController(getApisUsecase);

export { getApisController };
