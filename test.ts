import z from "zod"
import { ZodErrorFormatter } from "./src/shared/utils/zod-error-formatter.js";
import { patchUserSchema } from "./src/modules/user/usecases/patch-user.usecase.js";



const data = {}

const result = patchUserSchema.safeParse(data);
if(result.success){
    process.exit(0);
}
const error = result.error
console.log(error)

