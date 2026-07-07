import { Request, Response } from "express";
import { LoginUsecase } from "../usecases/login.usecase.js";
import { setCookie } from "../../../shared/utils/setCookie.js";
import { JwtToken } from "../../../shared/utils/jwt-token.js";

class LoginController {
    readonly #loginUsecase:LoginUsecase;
    constructor(usecase:LoginUsecase){
        this.#loginUsecase = usecase;
    }

    public handle = async(req:Request,res:Response)=>{
        try{
            const email = req.body.email;
            const password = req.body.password;
            const result =  await this.#loginUsecase.execute({email,password}); 
            if(!result.ok){
                return res.json({success:false,msg:result.error.message});
            }
            const jwtToken = JwtToken.create({id:result.data.id,email:result.data.email});
            setCookie(res,"__access-token",jwtToken)
            return res.status(201).json({success:true, message:"Logged In"})
        }catch(err){
            console.log(err)
        }
    }
}

const loginUsecase = new LoginUsecase();
const loginController = new LoginController(loginUsecase);

export {loginController};
