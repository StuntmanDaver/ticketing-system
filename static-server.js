const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'project', 'dist')));

// Serve all routes to index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'project', 'dist', 'index.html'));
});

const PORT = 7000;
app.listen(PORT, () => {
  console.log(`Static server running at http://localhost:${PORT}`);
}); 