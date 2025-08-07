// Archivo: /api/instagram.js

export default async function handler(req, res) {
  // El ID de tu usuario de Instagram
  const userId = '24654366867514458'; 
  
  // CORRECTO: Leemos la variable de entorno llamada 'INSTAGRAM_ACCESS_TOKEN'
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  
  // El número de publicaciones que quieres obtener
  const limit = 6;

  // Si la variable de entorno no fue encontrada en Vercel, devuelve un error
  if (!accessToken) {
    return res.status(500).json({ error: 'La variable de entorno INSTAGRAM_ACCESS_TOKEN no está configurada en Vercel.' });
  }

  // Los campos que queremos obtener de cada publicación
  const fields = 'media_url,media_type,permalink,thumbnail_url';
  const url = `https://graph.instagram.com/${userId}/media?fields=${fields}&access_token=${accessToken}&limit=${limit}`;

  try {
    // Hacemos la llamada a la API de Instagram
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      // Mostramos el error específico de la API de Instagram si algo sale mal con el token
      throw new Error(`Error de la API de Instagram: ${errorData.error.message}`);
    }

    const data = await response.json();
    
    // Enviamos los datos de vuelta al frontend
    res.status(200).json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
