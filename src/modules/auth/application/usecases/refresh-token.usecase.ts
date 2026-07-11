import { AuthenticationError } from "../../../../shared/errors/authentication.error.js";
import  jwt from "jsonwebtoken"
import { fail, ok, Result } from "../../../../shared/result.js";
import { JwtToken } from "../../../../shared/utils/jwt-token.js";
import { InternalServerError } from "../../../../shared/errors/internal-server.error.js";

type RefreshTokenUsecaseResult = {
    accessToken:string;
    refreshToken:string
}
class RefreshTokenUsecase {

    public execute = async(refreshToken:string):Promise<Result<RefreshTokenUsecaseResult,AuthenticationError>>=>{
        try{
            const payload = JwtToken.verifyToken(refreshToken) as {
                id: string;
                email: string;
            };
            const newAccessToken = JwtToken.createRefreshToken({id:payload.id,email:payload.email});
            const newRefreshToken = JwtToken.createRefreshToken({id:payload.id,email:payload.email});
            return ok({accessToken:newAccessToken,refreshToken:newRefreshToken});

        }catch(err){
            if(err instanceof jwt.TokenExpiredError || err instanceof jwt.JsonWebTokenError){
                return fail(new AuthenticationError({message:"Token invalid or expired.",options:{cause:err,context:{refreshToken}}}));
            }
            return fail(new InternalServerError({message:"Something went wrong.",options:{cause:err}}));
        }

    }
}

export {RefreshTokenUsecase};

