import fetch from 'node-fetch';

export default async function handler(req, res) {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const businessAccountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;

  if (!accessToken || !businessAccountId) {
    console.error("Variables de entorno faltantes");
    return res.status(500).json({
      error: 'Configuración del servidor incompleta. Contactar al administrador.'
    });
  }

  // Pedimos sólo los últimos 6
  const url = `https://graph.facebook.com/v19.0/${businessAccountId}/media` +
              `?fields=id,caption,media_url,permalink,media_type,thumbnail_url` +
              `&limit=6&access_token=${accessToken}`;

  try {
    const instagramResponse = await fetch(url);
    const data = await instagramResponse.json();

    if (data.error) {
      console.error('Error API Instagram:', data.error);
      return res.status(400).json({ error: data.error.message });
    }

    // respondemos { data: [...] }
    return res.status(200).json({ data: data.data });
  } catch (error) {
    console.error('Error interno en /api/instagram:', error);
    return res.status(500).json({ error: 'Error inesperado en el servidor.' });
  }
}
