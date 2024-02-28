const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const port = 3001; // Choose any available port for your proxy server

// Define your API server's URL
const apiServer = "https://demo-logisfipro-api.thehaulagehub.com";

// Enable CORS for all routes (replace '*' with the actual allowed origin)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Create a proxy for your API server
const apiProxy = createProxyMiddleware({
  target: apiServer,
  changeOrigin: true,
  pathRewrite: {
    "^/api": "", // Remove the '/api' prefix when forwarding requests
  },
});

// Use the proxy middleware for all routes starting with '/api'
app.use("/api", apiProxy);

// Start the proxy server
app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
