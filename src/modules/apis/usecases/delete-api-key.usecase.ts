import z from "zod";
import { pool } from "../../../configs/db-connection.js";
import { fail, ok } from "../../../shared/result.js";

const DeleteApiKeySchema = z.object( {
    apiKeyId:z.string(),
})

type DeleteApiKeyUsecaseData ={
    userId:string,
    apiKeyId:string
}

class DeleteApiKeyUsecase {
    public execute = async(data:DeleteApiKeyUsecaseData)=>{
        const result = await pool.query("Delete from apis where id = $1 and user_id = $2",[data.apiKeyId, data.userId]);
        if(!result.rowCount){
            return fail(new Error("Not found"))
        }
        return ok({})
    };
}

export {DeleteApiKeyUsecase, DeleteApiKeySchema};
