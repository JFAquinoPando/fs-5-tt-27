# Asistente de IA por consola

Aplicación de Node.js que envía una consulta a un modelo local mediante Ollama o a Google Gemini, y guarda la última consulta y respuesta en `contexto.json`.

## Requisitos

- Node.js 20.6 o posterior.
- Para el proveedor local: Ollama instalado y en ejecución, con el modelo local descargado.
- Para el proveedor en la nube: una clave de API de Google Gemini.

## Configuración

Instala las dependencias:

```bash
npm install
```

Configura las variables en un archivo `.env` en la raíz del proyecto:

```dotenv
MODELO_IA_LOCAL=nombre-del-modelo-de-ollama
MODELO_IA_CLOUD=nombre-del-modelo-de-gemini
API_CLOUD=tu-clave-de-google-gemini
```

Solo necesitas configurar `API_CLOUD` si usarás el proveedor `CLOUD`. No compartas ni subas claves de API.

## Uso

El proveedor predeterminado es `LOCAL`:

```bash
node app.js --mensaje="¿Qué es JavaScript?"
```

Para usar Gemini:

```bash
node app.js --mensaje="¿Qué es JavaScript?" --proveedor=CLOUD
```

También puedes iniciar la aplicación con npm. El `--` separa las opciones de npm de los argumentos que se envían a `app.js`:

```bash
npm run dev -- --mensaje="¿Quién fue Pitágoras?" --proveedor=CLOUD
```

La respuesta se muestra en la consola. Después de una consulta exitosa, la aplicación guarda la pregunta y la respuesta en `contexto.json` para usarlas como contexto en la siguiente llamada.
