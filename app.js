import { llamada } from "./funciones.js";
/* node app.js --mensaje="Esto se va a colocar asi" --proveedor=CLOUD */
/* 0    1      2                                        3 */
const [_, __, mensaje, proveedor] = process.argv

if (mensaje === undefined || !mensaje.includes("--mensaje=")) {
    console.log("Carga el mensaje");
} else {
    const [_, texto] = mensaje.split("--mensaje=")
    let respuesta = ""
    if (proveedor && proveedor.includes("--proveedor=")) {
        const [_, proveedor_ia] = proveedor.split("--proveedor=")
        respuesta = await llamada(texto, proveedor_ia);
    } else {
        console.log(texto);
        respuesta = await llamada(texto)
    }
    console.log("RESPUESTA DE LA IA:", respuesta);
    
}




