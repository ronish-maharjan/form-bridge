import { ValidationError } from "../../../shared/errors/validation.error.js";
import { fail, ok, Result } from "../../../shared/result.js";

class IdVo{
    readonly #value:string;
    private constructor(input:string){
        this.#value = input
    }

    static create(input:string):Result<IdVo,ValidationError>{
        const isValid = input.trim().length === 36;
        if(!isValid){
            return fail(new ValidationError({message:"User Id validation failed",options:{context:{issues:[{field:"id",message:"Invalid Id"}]}}}));
        }
        return ok(new IdVo(input));
    }

    public getValue():string{
        return this.#value; 
    }
}

export {IdVo};
