import dotenv from "dotenv";
dotenv.config();

export const config = {
    AZURE_BUS_CONNECTION_STRING :  process.env.AZURE_BUS_CONNECTION_STRING
}