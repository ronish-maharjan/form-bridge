import argon2 from "argon2";
class PasswordHasher {
    private constructor(){};
    static async hash (password:string):Promise<string>{
        return argon2.hash(password);    
     }
    static async verify(hashedPassword:string,textPassword:string){
        return argon2.verify(hashedPassword,textPassword);
    }
};
export {PasswordHasher};
