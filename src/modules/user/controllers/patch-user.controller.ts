import { NextFunction, Request, Response } from "express";
import { PatchUserUsecase } from "../usecases/patch-user.usecase.js";

class PatchUserController {
    readonly #patchUserUsecase:PatchUserUsecase;
    constructor(usecase:PatchUserUsecase){
        this.#patchUserUsecase = usecase;
    }
    public handle = async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const data ={id:req.user.id,...req.body};  
            const result = await this.#patchUserUsecase.execute(data);
            if(!result.ok){
                throw result.error;
            }
            return res.sendStatus(204);
        }catch(err){
            return res.status(500).json({success:false,error:err})
        }
    }
}

const patchUserUsecase = new PatchUserUsecase();
const patchUserController = new PatchUserController(patchUserUsecase);
export {patchUserController};
