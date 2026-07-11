import {z} from "zod";

type FormattedErrorType = Record<string,string>[];

class ZodErrorFormatter {
    private constructor(){};
    static format(zodError: z.ZodError) {
        const errorObject = zodError.flatten(); 
        let formattedError:FormattedErrorType = []
        const fieldErrors:Record<string,string[]> = errorObject.fieldErrors;
        const formErrors:string[]= errorObject.formErrors;
        Object.entries(fieldErrors).map(([field,msg])=>{
            formattedError.push({field,message:msg[0]})
        })
        formErrors.map((msg)=>{formattedError.push({message:msg})});
        return formattedError
    }
}

export {ZodErrorFormatter};
