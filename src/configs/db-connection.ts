import { Pool } from "pg";
import { env } from "./env.js";


const pool = new Pool({
    connectionString:env.connectionString,
});

export {pool};
