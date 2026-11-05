import ollama from 'ollama'
import { env, loadEnvFile } from "node:process";
import { GoogleGenAI } from '@google/genai';
loadEnvFile()

const { MODELO_IA_LOCAL, MODELO_IA_CLOUD, CLOUD_LOCAL, API_CLOUD } = env

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
    const ai = new GoogleGenAI({ apiKey: API_CLOUD });

    const respuesta = await ai.models.generateContent({
        model: MODELO_IA_CLOUD,
        contents: '¿Cual es el resultado de sumar 2 con 2?',
    });
    console.log(respuesta.text /* .text */);
}


/* a7frapmdC4vh0_gP-Yy08QQ */