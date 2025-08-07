// Usamos 'node-fetch' para hacer la solicitud desde el servidor.
// Instálalo con: npm install node-fetch
const fetch = require('node-fetch');

// Handler para Vercel/Netlify
export default async function handler(req, res) {
  // ¡IMPORTANTE! Guarda tu token en las "Variables de Entorno" de tu hosting, no aquí.
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  // La API que deberías usar es la "Basic Display API", su endpoint es ligeramente diferente.
  // Pide también el campo 'thumbnail_url' para los videos.
  const url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,media_type,thumbnail_url&limit=6&access_token=${accessToken}`;

  try {
    const instagramResponse = await fetch(url);
    if (!instagramResponse.ok) {
      // Si Instagram devuelve un error, lo pasamos al frontend para depurar.
      const errorData = await instagramResponse.json();
      console.error('Error desde la API de Instagram:', errorData);
      return res.status(instagramResponse.status).json({ error: errorData.error.message });
    }

    const data = await instagramResponse.json();
    
    // Devolvemos los datos al frontend en formato JSON
    res.status(200).json(data);

  } catch (error) {
    console.error('Error en la función del servidor:', error);
    res.status(500).json({ error: 'Hubo un error en el servidor.' });
  }
}
