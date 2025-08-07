const fetch = require('node-fetch');

export default async function handler(req, res) {
  // 1. Verificar si la variable de entorno existe.
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!accessToken) {
    // Si el token no está configurado, envía un error claro.
    console.error("Error: La variable de entorno INSTAGRAM_ACCESS_TOKEN no está configurada.");
    return res.status(500).json({ error: 'El token de acceso del servidor no está configurado.' });
  }

  // Pide también el campo 'thumbnail_url' para los videos.
  const url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,media_type,thumbnail_url&limit=6&access_token=${accessToken}`;

  try {
    const instagramResponse = await fetch(url);
    const data = await instagramResponse.json();

    // 2. Verificar si la API de Instagram devolvió un error.
    if (!instagramResponse.ok || data.error) {
      console.error('Error desde la API de Instagram:', data.error);
      return res.status(instagramResponse.status).json({ error: `Error de Instagram: ${data.error.message}` });
    }

    // Si todo fue bien, devuelve los datos.
    res.status(200).json(data);

  } catch (error) {
    // Captura cualquier otro error (ej: de red)
    console.error('Error en la función del servidor:', error);
    res.status(500).json({ error: 'Hubo un error inesperado en el servidor.' });
  }
}
