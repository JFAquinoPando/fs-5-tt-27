import ollama from 'ollama'
import { env, loadEnvFile } from "node:process";
import { writeFile, readFile } from "node:fs/promises";
import { GoogleGenAI } from '@google/genai';
loadEnvFile()

const { MODELO_IA_LOCAL, MODELO_IA_CLOUD, API_CLOUD } = env

export async function guardarContexto(preguntar, respuesta) {
    await writeFile("contexto.json", JSON.stringify(
        {
            "PREGUNTA": preguntar,
            "RESPUESTA": respuesta
        }
    ));
}

export async function recuperarContexto() {
    return await readFile("contexto.json", { encoding: "utf8" })
}

export async function llamada(texto, proveedor = "LOCAL") {
    proveedor = proveedor.toUpperCase()
    if (texto.trim().length === 0) {
        return "Indicame tu consulta"
    }


    if (proveedor && proveedor === "CLOUD") {
        const ai = new GoogleGenAI({ apiKey: API_CLOUD });
        const contexto = await recuperarContexto()
        const respuesta = await ai.models.generateContent({
            model: MODELO_IA_CLOUD,
            contents:
                `CONTEXTO: ANTERIOR: ${contexto} | 
                nuevo prompt: ${texto}`,
        });
        const resultado = respuesta.text
        await guardarContexto(texto, resultado)
        return resultado
    } else {
        const contexto = await recuperarContexto()
        const respuesta = await ollama.chat({
            model: MODELO_IA_LOCAL,
            messages: [
                {
                    role: 'assistant',
                    content: contexto
                }, {
                    role: 'user',
                    content: texto
                }],
        })
        const resultado = respuesta.message.content
        await guardarContexto(texto, resultado)
        return resultado

    }
}