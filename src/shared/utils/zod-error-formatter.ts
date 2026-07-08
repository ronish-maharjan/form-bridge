import {z} from "zod";

class ZodErrorFormatter {
    private constructor(){};
    static format(zodError: z.ZodError) {
        const errorObject = zodError.flatten(); 
        const fieldError = Object.fromEntries(Object.entries(errorObject.fieldErrors).map(([field,messages])=>[field,messages[0]]));
        const formError = errorObject.formErrors;
        let formattedError = {fieldError,formError};
        return JSON.stringify(formattedError);
    }
}

export {ZodErrorFormatter};
