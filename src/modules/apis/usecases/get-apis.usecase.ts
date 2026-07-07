import { pool } from "../../../configs/db-connection.js";
import { ok ,Result} from "../../../shared/result.js";

type GetApiUsecaseData = {
    id:string;
}

class GetApiUsecase {
    public async execute(data:GetApiUsecaseData):Promise<Result<unknown[],Error>>{
        const result = await pool.query("select id,url,api_key from apis where user_id = $1",[data.id]);
        const apis = result.rows;
        return ok(apis);
    }
}

export {GetApiUsecase};
