import { ValidationError } from "../../../shared/errors/validation.error.js";
import { fail, ok, Result } from "../../../shared/result.js";

class PasswordVo {
    readonly #value:string;
    private constructor(input:string){
        this.#value = input
    }

    static create(input:string):Result<PasswordVo,ValidationError>{
        const hasUpperCase = /[A-Z]/.test(input); 
        const hasLowerCase = /[a-z]/.test(input);
        const hasNumber = /[0-9]/.test(input);
        const hasSymbol = /[!@#$%^&*()]/.test(input);
        if(!hasUpperCase || !hasLowerCase || !hasNumber || !hasSymbol){
            return fail(new ValidationError({message:"Password validation failed.",options:{context:{issues:[{field:"password",message:"Password must contain atleast one uppercase,lowercase,number and !@#$%^&*()."}]}}}));
        }
        return ok(new PasswordVo(input));
    }

    public getValue():string{
        return this.#value; 
    }
}

export {PasswordVo};
