import { Request ,Response,NextFunction} from "express";
import { RefreshTokenUsecase } from "../../../application/usecases/refresh-token.usecase.js";
import { setCookie } from "../../../../../shared/utils/setCookie.js";
class RefreshTokenController {
    readonly #refreshTokenUsecase:RefreshTokenUsecase;

    constructor(usecase:RefreshTokenUsecase){
        this.#refreshTokenUsecase = usecase;
    };
    public handle = async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const refreshToken = req.cookies["__secure-refresh-token"];
            const usecaseResult = await this.#refreshTokenUsecase.execute(refreshToken);
            if(!usecaseResult.ok){
                throw usecaseResult.error;
            }
            setCookie(res,"__secure-access-token",usecaseResult.data.accessToken,1000*60*15);
            setCookie(res,"__secure-refresh-token",usecaseResult.data.refreshToken,1000*60*60*24*7);
            res.sendStatus(204);
        }catch(err){
            return next(err)
        }
    }

}

export {RefreshTokenController};
