import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { JwtToken } from "../../../shared/utils/jwt-token.js";
import { GetUserUsecase } from "../usecases/get-user.usecase.js";

class GetUserController { 
    readonly #getUserUsecase:GetUserUsecase;
    constructor(usecase:GetUserUsecase){
        this.#getUserUsecase = usecase;
    }
    public handle = async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const token = req.cookies["__access-token"];

            const payload = JwtToken.verify(token) as JwtPayload & {
                email: string;
                id:string;
            };

            const id = payload.id;

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

const getUserUsecase = new GetUserUsecase();
const getUserController = new GetUserController(getUserUsecase);

export { getUserController };
