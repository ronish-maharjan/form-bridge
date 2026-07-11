import { ValidationError } from "../../../shared/errors/validation.error.js";
import { fail, ok, Result } from "../../../shared/result.js";

class EmailVo {
    readonly #value:string;

    private constructor(input:string){
         this.#value = input
    }

    // we are sure becasue the middleware already validatie the basics like type of data, length
    static create(input:string):Result<EmailVo,ValidationError>{
        //curently only gmail email to use cause i dont want to validate other temp mails fake emails
        const isValid = /^[a-z][a-z0-9\.]{5,}@gmail\.com$/.test(input);
        if(!isValid){
            return fail(new ValidationError({message:"Email validation failed.",options:{context:{issues:[{field:"email",message:"Email must be valid google email."}]}}}))
        }
        return ok(new EmailVo(input));
    }

    public getValue():string{
        return this.#value 
    }
}

export {EmailVo};
