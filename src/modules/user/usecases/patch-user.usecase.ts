import { pool } from "../../../configs/db-connection.js";
import {z} from "zod";
import { ok, Result } from "../../../shared/result.js";

const patchUserSchema = z
.object({
    email: z.string().regex(/^[a-z][a-z0-9.]*@gmail\.com$/).optional(),
    password: z.string().trim().min(8).optional(),
    inboxMail: z.string().regex(/^[a-z][a-z0-9.]*@gmail\.com$/).optional(),
})
.refine(
    (data) =>
    data.email !== undefined ||
        data.password !== undefined ||
        data.inboxMail !== undefined,
    {
        message:"No data provided",
    }
);
type PatchUserUsecaseData = {
    id: string;
    email?: string;
    password?: string;
    inboxMail?: string;
};

class PatchUserUsecase {
    public execute = async (data: PatchUserUsecaseData):Promise<Result<{data:unknown},Error>> => {
        const updates: string[] = [];
        const values: unknown[] = [];

        let index = 1;

        if (data.email) {
            updates.push(`email = $${index}`);
            values.push(data.email);
            index++;
        }

        if (data.password) {
            updates.push(`password = $${index}`);
            values.push(data.password);
            index++;
        }

        if (data.inboxMail) {
            updates.push(`inbox_mail = $${index}`);
            values.push(data.inboxMail);
            index++;
        }

        if (updates.length === 0) return;

        // add id last
        values.push(data.id);

        const query = `
        UPDATE users
        SET ${updates.join(", ")}
        WHERE id = $${index}
        `;

        const result = await pool.query(query, values);

        return ok({data:result});
    };
}

export { PatchUserUsecase ,patchUserSchema};
