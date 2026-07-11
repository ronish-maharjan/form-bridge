import jwt from "jsonwebtoken"
import { env } from "../../configs/env.js";     

type JwtPayload = {id:string,email:string}

class JwtToken {
    static createAccessToken(payload: JwtPayload) {
        return jwt.sign(payload, env.JWT_SECRET_KEY, {
            expiresIn: "15m",
        });
    }

    static createRefreshToken(payload: JwtPayload) {
        return jwt.sign(payload, env.JWT_SECRET_KEY, {
            expiresIn: "7d",
        });
    }

    static verifyToken(token: string) {
        return jwt.verify(token, env.JWT_SECRET_KEY);
    }
}

export {JwtToken};
