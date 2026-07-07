import { ok, fail, Result } from "../../../shared/result.js";
import { pool } from "../../../configs/db-connection.js";
import { PasswordHasher } from "../../../shared/utils/passwordHasher.js";

type LoginData = {
    email:string;
    password:string;
}

class LoginUsecase{
    public execute = async(data:LoginData):Promise<Result<{id:string,email:string},Error>>=>{
       const email = data.email;
       const password = data.password;

       const dbUser = await pool.query("select * from users where email = $1",[email]);    
       if(!dbUser.rowCount){
            return fail(new Error("User dont exist."))
       }
       const hashedPassword = dbUser.rows[0].password;
       const isPasswordValid = await PasswordHasher.verify(hashedPassword,password);
       if(!isPasswordValid){
            return fail(new Error("Password Incorrect"));
       }
       return ok({id:dbUser.rows[0].id,email:dbUser.rows[0].email});
    }
}

export {LoginUsecase};
