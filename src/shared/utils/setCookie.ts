import { Response } from "express";

function setCookie(res:Response,key:string,value:unknown){
    res.cookie(key,value,{
        httpOnly:true,
        secure:true,
        sameSite:"strict",
        maxAge: 1000 * 60 * 15,  
        path:"/"
    })
}
export {setCookie};
