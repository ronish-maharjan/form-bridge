import { ValidationError } from "../../../../shared/errors/validation.error.js";
import { fail,ok,Result } from "../../../../shared/result.js";

class ApiKeyVo {
    readonly #value:string;
    private constructor(input:string){
        this.#value = input; 
    }

    static create(input:string):Result<ApiKeyVo,ValidationError>{
        const isValid = /^mb_[a-z0-9]{64}/.test(input);    
        if(!isValid){
            return fail(new ValidationError({message:"Invalid api key",options:{context:{field:"apiKey",apiKey:input}}}))
        }
        return ok(new ApiKeyVo(input));
    }

    public getValue():string{
        return this.#value;
    }
}

export {ApiKeyVo};

