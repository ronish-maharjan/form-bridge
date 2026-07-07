import jwt from "jsonwebtoken"
import { env } from "../../configs/env.js";     

type JwtPayload = {id:string,email:string}

class JwtToken {
    static readonly #secretKey:string = env.JWT_SECRET_KEY;
    private constructor(){};

    static create(payload:JwtPayload){
        return jwt.sign(payload,this.#secretKey,{expiresIn:"15m"})
    }

    static verify(token:string){
        return jwt.verify(token,this.#secretKey);
    }

}

export {JwtToken};
