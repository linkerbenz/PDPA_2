import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 8080;

const distPath = path.join(__dirname, 'dist');

// Serve static files from dist or root based on environment
if (process.env.NODE_ENV === 'development') {
  app.use(express.static(__dirname));
} else {
  app.use(express.static(distPath));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) {
      res.sendFile(path.join(__dirname, 'index.html'));
    }
  });
});

app.listen(PORT, () => {
  console.log(`PDPA_2 UAT server running http://localhost:${PORT}`);
  console.log(`Serving from: ${distPath}`);
});
