import { env, loadEnvFile } from "node:process";
import { config, parse } from "dotenv";
/* loadEnvFile() */
config()
const {CONTRASENHA, API_OPENAI, CORREO } = env
console.log(CONTRASENHA, API_OPENAI, CORREO);
