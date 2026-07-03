import argon2 from "argon2"
import {v4 as uuidV4} from "uuid"
import { pool } from "../configs/db-connection.js";

type SignupData = {email:string,password:string};


// password hassher 

const passwordHasher = async (password:string):Promise<string>=>{
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
}

// id generator
const generateId = ():string=>{
    return uuidV4()
}

class SignupUsecase {

    async execute(data:SignupData){
        const isAlreadyExist = await pool.query("select * from users where email = $1", [data.email]);
        if(isAlreadyExist.rowCount){
            return {success:false,msg:"user already exist"};
        }
        const id = generateId();
        const email = data.email;
        const password = await passwordHasher(data.password)
        await pool.query("insert into users(id,email,password)values($1,$2,$3)",[id,email,password]);
        return {success:true,msg:"User created"};
    }

}
export {SignupUsecase};
