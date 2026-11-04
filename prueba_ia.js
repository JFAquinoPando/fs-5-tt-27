import ollama from 'ollama'
import { env, loadEnvFile } from "node:process";
loadEnvFile()

const { MODELO_IA_LOCAL, MODELO_IA_CLOUD, CLOUD_LOCAL, API_OPENAI } = env

if (CLOUD_LOCAL === "LOCAL") {
    const respuesta = await ollama.chat({
        model: MODELO_IA_LOCAL,
        messages: [{
            role: 'user',
            content: '¿Cual es el resultado de sumar 2 con 2?'
        }],
    })
    console.log(respuesta /* .message.content */)
} else {

}