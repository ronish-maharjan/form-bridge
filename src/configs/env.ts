import dotenv from "dotenv"
dotenv.config();

const env = {
    connectionString:process.env.DATABASE_CONNECTION_URL,
    port:process.env.PORT
}
export {env};

