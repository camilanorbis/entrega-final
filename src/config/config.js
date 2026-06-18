import dotenv from "dotenv";

dotenv.config();

export const config = {
    MONGO_URL: process.env.MONGO_URL,
    DB_NAME: process.env.DB_NAME,
    DB_NAME_TEST: process.env.DB_NAME_TEST,
    PORT: process.env.PORT
}