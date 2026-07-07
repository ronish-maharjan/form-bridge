import { pool } from "../../../configs/db-connection.js";
import { ok } from "../../../shared/result.js";

type GetUserUsecaseData = {id:string};
class GetUserUsecase {
    public execute = async (data:GetUserUsecaseData) =>{
        const id = data.id;
        const dbResutl = await pool.query("select * from users where id = $1",[id]);
        const user = dbResutl.rows[0];
        const {password,...safeResult} = user
        return ok(safeResult);
    }
}


export {GetUserUsecase};
