require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");
const crypto = require("crypto");

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

function validateHmac(query) {
  const { hmac, ...rest } = query;
  const params = new URLSearchParams(rest);
  params.sort();
  const message = params.toString();
  return (
    crypto
      .createHmac("sha256", process.env.SHOPIFY_API_SECRET)
      .update(message)
      .digest("hex") === hmac
  );
}

app.get("/", (req, res) => {
  const { shop, hmac } = req.query;

  if (shop && hmac) {
    return res.redirect(
      `/install?${new URLSearchParams(req.query).toString()}`
    );
  }
  res.send(`
    <h1>Welcome to the AI Chatbot App</h1>
    <p>Install this app via your Shopify Admin:</p>
    <a href="${shop}/admin/apps" target="_blank">
      Open Shopify Apps
    </a>
  `);
});

app.post("/chat", async (req, res) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: req.body.message }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPEN_ROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.json({ reply: response.data.choices[0].message.content });
  } catch (err) {
    console.error("AI Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "AI Error",
      details: err.response?.data || err.message,
    });
  }
});

app.get("/install", (req, res) => {
  const { shop } = req.query;
  if (!shop) return res.status(400).send("Shop parameter missing");

  const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${process.env.SHOPIFY_API_KEY}&scope=${process.env.SHOPIFY_SCOPES}&redirect_uri=${process.env.HOST}/auth/callback`;
  res.redirect(authUrl);
});

app.get("/auth/callback", async (req, res) => {
  const { shop, code, hmac } = req.query;

  if (!validateHmac(req.query)) {
    return res.status(403).send("Invalid HMAC");
  }

  try {
    const {
      data: { access_token },
    } = await axios.post(`https://${shop}/admin/oauth/access_token`, {
      client_id: process.env.SHOPIFY_API_KEY,
      client_secret: process.env.SHOPIFY_API_SECRET,
      code,
    });

    const {
      data: { script_tags },
    } = await axios.get(`https://${shop}/admin/api/2024-01/script_tags.json`, {
      headers: { "X-Shopify-Access-Token": access_token },
    });

    const scriptExists = script_tags.some((tag) =>
      tag.src.includes("chatbot.js")
    );

    if (!scriptExists) {
      await axios.post(
        `https://${shop}/admin/api/2024-01/script_tags.json`,
        {
          script_tag: {
            event: "onload",
            src: `${process.env.HOST}/chatbot.js`,
            display_scope: "all",
          },
        },
        { headers: { "X-Shopify-Access-Token": access_token } }
      );
    }
    res.redirect(`https://${shop}/admin/apps`);
  } catch (error) {
    console.error("OAuth Error:", error.response?.data || error.message);
    res.status(500).send(`Installation failed: ${error.message}`);
  }
});

app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`App URL: ${process.env.HOST}`);
});
