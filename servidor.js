import { createServer } from 'node:http';
import { Readable } from 'node:stream';
import { llamada } from "./funciones.js";

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174'
];

const server = createServer(async (peticion, respuesta) => {
  const origin = peticion.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    respuesta.setHeader('Access-Control-Allow-Origin', origin);
  }

  respuesta.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  respuesta.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (peticion.method === 'OPTIONS') {
    respuesta.writeHead(204);
    respuesta.end();
    return;
  }

  if (peticion.method === 'POST') {
    const contentType = peticion.headers['content-type'] || '';
    let parsedData = {};

    try {
      if (contentType.includes('multipart/form-data')) {
        const webStream = Readable.toWeb(peticion);
        const webRequest = new Request('http://localhost:3000' + (peticion.url || '/'), {
          method: 'POST',
          headers: peticion.headers,
          body: webStream,
          duplex: 'half'
        });

        const formData = await webRequest.formData();

        for (const [key, value] of formData.entries()) {
          if (value instanceof File) {
            parsedData[key] = {
              name: value.name,
              size: value.size,
              type: value.type
            };
          } else {
            parsedData[key] = value;
          }
        }
      } else {
        let rawBody = '';
        for await (const chunk of peticion) {
          rawBody += chunk;
        }

        if (rawBody) {
          parsedData = JSON.parse(rawBody);
        }
      }

      console.log('Payload recibido:', parsedData);

      respuesta.writeHead(200, { 'Content-Type': 'application/json' });

      const respuestaIA = await llamada(parsedData.consulta)

      respuesta.end(JSON.stringify({
        status: 'success',
        message: respuestaIA,
        data: parsedData
      }));
      return;
    } catch (error) {
      console.error('Error al procesar la petición:', error);
      respuesta.writeHead(400, { 'Content-Type': 'application/json' });
      respuesta.end(JSON.stringify({
        status: 'error',
        message: 'No se pudo procesar el contenido de la petición'
      }));
      return;
    }
  }

  respuesta.writeHead(200, { 'Content-Type': 'application/json' });
  respuesta.end(JSON.stringify({ message: 'Hello World!' }));
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Server running on http://127.0.0.1:3000');
});
