// Archivo: /api/instagram.js

export default async function handler(req, res) {
  // El ID de tu usuario de Instagram, que se ve en la imagen
  const userId = '17841476081965186'; 
  
  // Tu token de acceso, que leeremos de las variables de entorno de Vercel
  const accessToken = process.env.IGAAQF1BUZArqFBZAE1VaHZABMXVKR0xQTnJCUjFENUpkbDlNcUdMb0dhWUhXQmc2d3J0VnRaVHlWcHFoSlFhMmpYMFE1ZAXBGd3FrcUIxcHZAXWFhyUk9xYXBnLXpLQzEtLXBSVVhmdnBpZA0MxNzl5SzhYcDlDV3VGNUpuS0hOSTNBMAZDZD;
  
  // El número de publicaciones que quieres obtener
  const limit = 6;

  // Si el token no está configurado en Vercel, devuelve un error
  if (!accessToken) {
    return res.status(500).json({ error: 'El token de acceso de Instagram no está configurado en el servidor.' });
  }

  // Los datos que queremos obtener de cada publicación
  const fields = 'media_url,media_type,permalink,thumbnail_url';
  const url = `https://graph.instagram.com/${userId}/media?fields=${fields}&access_token=${accessToken}&limit=${limit}`;

  try {
    // Hacemos la llamada a la API de Instagram
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
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
