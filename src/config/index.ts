import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(__dirname, `../../.env`),
});

export default {
  DB_URI: process.env.DB_URI || "mongodb://mongo:27017/code-exec",
  PORT: process.env.PORT || 3000,
};
