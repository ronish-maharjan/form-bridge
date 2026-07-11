import { ValidationError } from "../../../../shared/errors/validation.error.js";
import { fail,ok,Result } from "../../../../shared/result.js";

class UrlVo {
    readonly #value:string;
    private constructor(input:string){
        this.#value = input; 
    }

    static create(input:string):Result<UrlVo,ValidationError>{
        const isValid = /^https?:\/\//.test(input);    
        if(!isValid){
            return fail(new ValidationError({message:"Support only http or https urls.",options:{context:{field:"url",url:input}}}))
        }
        return ok(new UrlVo(input));
    }

    public getValue():string{
        return this.#value;
    }
}

export {UrlVo};

