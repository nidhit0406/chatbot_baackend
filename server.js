require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const crypto = require('crypto');

const app = express();

// Middleware
// app.use(cors({ origin: "*" }));
app.use(cors({
  origin: ['https://chatbot-iota-rose.vercel.app/'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// HMAC Validation
function validateHmac(query) {
  const { hmac, ...rest } = query;
  const params = new URLSearchParams(rest);
  params.sort(); // Alphabetize for Shopify's spec
  const message = params.toString();
  return crypto
    .createHmac('sha256', process.env.SHOPIFY_API_SECRET)
    .update(message)
    .digest('hex') === hmac;
}

// Token Storage (Replace with your database logic)
async function storeAccessToken(shop, token) {
  console.log(`Storing token for ${shop}`); // Implement actual storage
}

// Root URL - Redirect to install
app.get('/', (req, res) => {
  const { shop, hmac } = req.query;
  
  // Case 1: Accessed via Shopify OAuth flow
  if (shop && hmac) {
    return res.redirect(`/install?${new URLSearchParams(req.query).toString()}`);
  }

  // Case 2: Direct access - show installation instructions
  res.send(`
    <h1>Welcome to the AI Chatbot App</h1>
    <p>Install this app via your Shopify Admin:</p>
    <a href="${shop}/admin/apps" target="_blank">
      Open Shopify Apps
    </a>
  `);
});

// AI Chat Endpoint
app.post('/chat', async (req, res) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      { 
        model: "gpt-3.5-turbo", 
        messages: [{ role: "user", content: req.body.message }] 
      },
      { 
        headers: { 
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        } 
      }
    );
    res.json({ reply: response.data.choices[0].message.content });
  } catch (err) {
    console.error("AI Error:", err.response?.data || err.message);
    res.status(500).json({ 
      error: "AI Error", 
      details: err.response?.data || err.message 
    });
  }
});

// Shopify Install Route
app.get('/install', (req, res) => {
  const { shop } = req.query;
  if (!shop) return res.status(400).send('Shop parameter missing');

  const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${process.env.SHOPIFY_API_KEY}&scope=write_script_tags&redirect_uri=${process.env.HOST}/auth/callback`;
  console.log('Redirecting to:', authUrl); // Debug
  res.redirect(authUrl);
});

// OAuth Callback
app.get('/auth/callback', async (req, res) => {
  const { shop, code, hmac } = req.query;

  // 1. Validate HMAC
  if (!validateHmac(req.query)) {
    return res.status(403).send('Invalid HMAC');
  }

  try {
    // 2. Get access token
    const { data: { access_token } } = await axios.post(
      `https://${shop}/admin/oauth/access_token`,
      {
        client_id: process.env.SHOPIFY_API_KEY,
        client_secret: process.env.SHOPIFY_API_SECRET,
        code
      }
    );

    // 3. Store token (implement your database logic)
    await storeAccessToken(shop, access_token);

    // 4. Check for existing script tags
    const { data: { script_tags } } = await axios.get(
      `https://${shop}/admin/api/2024-01/script_tags.json`,
      { headers: { "X-Shopify-Access-Token": access_token } }
    );

    // 5. Inject script tag if not exists
    const scriptExists = script_tags.some(tag => 
      tag.src.includes('chatbot.js')
    );

    if (!scriptExists) {
      await axios.post(
        `https://${shop}/admin/api/2024-01/script_tags.json`,
        {
          script_tag: {
            event: "onload",
            src: `${process.env.HOST}/chatbot.js`,
            display_scope: "all"
          }
        },
        { headers: { "X-Shopify-Access-Token": access_token } }
      );
    }

    // 6. Redirect to app
    // res.redirect(`https://${shop}/admin/apps/${process.env.SHOPIFY_APP_HANDLE}/admin`);
    res.redirect(`https://${shop}/admin/apps`);

  } catch (error) {
    console.error('OAuth Error:', error.response?.data || error.message);
    res.status(500).send(`Installation failed: ${error.message}`);
  }
});

// Error Handling
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start Server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`App URL: ${process.env.HOST}`);
});