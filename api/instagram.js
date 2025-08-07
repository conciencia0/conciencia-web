// Archivo: /api/instagram.js

import fetch from 'node-fetch';

export default async function handler(req, res) {
  // Leemos de forma segura las variables desde tu hosting (Vercel/Netlify)
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const businessAccountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID; // ¡Nueva variable!

  // Verificación de que ambas variables de entorno están configuradas
  if (!accessToken || !businessAccountId) {
    console.error("Error Crítico: Las variables de entorno no están configuradas correctamente.");
    return res.status(500).json({ error: 'Configuración del servidor incompleta. Contactar al administrador.' });
  }

  // ¡ESTA ES LA URL CORRECTA PARA LA API DE EMPRESA!
  // Usa la versión v19.0 de la API de Facebook (muy estable)
  const url = `https://graph.facebook.com/v19.0/${businessAccountId}/media?fields=id,caption,media_url,permalink,media_type,thumbnail_url&limit=8&access_token=${accessToken}`;

  try {
    const instagramResponse = await fetch(url);
    const data = await instagramResponse.json();

    // Si la API de Instagram devuelve un error (ej: token inválido)
    if (data.error) {
      console.error('Error devuelto por la API de Facebook/Instagram:', data.error);
      return res.status(400).json({ error: `Error de Instagram: ${data.error.message}` });
    }

    res.status(200).json(data);

  } catch (error) {
    console.error('Error de ejecución en la función del servidor:', error);
    res.status(500).json({ error: 'Hubo un error inesperado en el servidor.' });
  }
}
