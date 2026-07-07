import z from "zod"
import { pool } from "../../../configs/db-connection.js";
import { fail, ok } from "../../../shared/result.js";
import { ApiKeyGenerator } from "../../../shared/utils/api-key-generator.js";
import { IdGenerator } from "../../../shared/utils/id-generator.js";

const CreateApiKeySchema = z.object({
    url:z.url()
})

type CreateApiKeyUsecaseData = {
    id:string;
    url:string;
}

class CreateApiKeyUsecase {
    public execute = async(data:CreateApiKeyUsecaseData)=>{
        const isExist = await pool.query("select url from apis where id = $1 and url = $2",[data.id,data.url]);
        if(isExist.rowCount){
           return fail(new Error("Url already exist")); 
        }

        // no need to hash because its public i thought of hashing but its just waste of resource and time 
        const newApiKey = ApiKeyGenerator.generate();
        const apiId = IdGenerator.generate();
        await pool.query("insert into apis(id,user_id,url,api_key)values($1,$2,$3,$4)",[apiId,data.id,data.url,newApiKey]);
        return ok({apiKey:newApiKey});
    }
}

export {CreateApiKeyUsecase,CreateApiKeySchema};
