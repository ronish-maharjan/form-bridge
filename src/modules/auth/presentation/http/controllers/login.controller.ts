import { NextFunction, Request, Response } from "express";
import { LoginUsecase } from "../../../application/usecases/login.usecase.js";
import { JwtToken } from "../../../../../shared/utils/jwt-token.js";
import { setCookie } from "../../../../../shared/utils/setCookie.js";

class LoginController {
    readonly #loginUsecase:LoginUsecase;
    constructor(usecase:LoginUsecase){
        this.#loginUsecase = usecase;
    }

    public handle = async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const email = req.body.email;
            const password = req.body.password;
            const result =  await this.#loginUsecase.execute({email,password}); 
            if(!result.ok){
                throw result.error;
            }
            const accessToken = JwtToken.createAccessToken({id:result.data.id,email:result.data.email});
            setCookie(res,"__Secure-access-token",accessToken,1000 * 60 * 15);
            const refreshToken = JwtToken.createRefreshToken({id:result.data.id,email:result.data.email});
            setCookie(res,"__Secure-refresh-token",refreshToken,1000 * 60 * 60 * 24 * 7);
            return res.sendStatus(204);
        }catch(err){
            next(err);
        }
    }
}

export {LoginController};
