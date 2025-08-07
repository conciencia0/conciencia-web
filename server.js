// server.js
const express = require('express');
require('dotenv').config();
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Servir index.html, logo.png, Prueba1.mp4
app.use(express.static(path.join(__dirname)));

app.get('/api/instagram', async (req, res) => {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId      = process.env.INSTAGRAM_USER_ID;

  if (!accessToken || !userId) {
    return res
      .status(500)
      .json({ error: 'Faltan INSTAGRAM_ACCESS_TOKEN o INSTAGRAM_USER_ID en .env' });
  }

  const url =
    `https://graph.facebook.com/v19.0/${userId}/media` +
    `?fields=id,caption,media_url,permalink,media_type,thumbnail_url` +
    `&limit=6&access_token=${accessToken}`;

  try {
    const igRes = await fetch(url);
    if (!igRes.ok) {
      const txt = await igRes.text();
      return res.status(igRes.status).json({ error: txt });
    }
    const payload = await igRes.json();
    if (payload.error) {
      return res.status(400).json({ error: payload.error.message });
    }
    return res.json({ data: payload.data });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
