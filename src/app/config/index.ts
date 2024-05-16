import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), "/.env") });


export default {
  port: process.env.PORT,
  db_uri: process.env.DB_URI,
};