import { llamada } from "./funciones.js";
/* node app.js --mensaje="Esto se va a colocar asi" --proveedor=CLOUD */
/* 0    1      2                                        3 */
async function main() {
    const argumentos = process.argv.slice(2);
    const mensaje = argumentos.find((argumento) => argumento.startsWith("--mensaje="));

    if (mensaje === undefined) {
        console.log("Carga el mensaje");
        return;
    }

    const texto = mensaje.slice("--mensaje=".length);
    const proveedor = argumentos.find((argumento) => argumento.startsWith("--proveedor="));

    if (proveedor === undefined) {
        console.log(texto);
    }

    const respuesta = proveedor === undefined
        ? await llamada(texto)
        : await llamada(texto, proveedor.slice("--proveedor=".length));
    console.log("RESPUESTA DE LA IA:", respuesta);
}

await main();
