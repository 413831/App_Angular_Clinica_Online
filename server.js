const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/token_validate', async (req, res) => {
  try {
    const token = req.body && req.body.recaptcha;
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!secretKey) {
      return res.status(500).json({ success: false, message: 'Missing RECAPTCHA_SECRET_KEY' });
    }

    if (!token) {
      return res.status(400).json({ success: false, message: 'Token is empty or invalid' });
    }

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token)}`;
    const response = await fetch(verifyUrl, { method: 'POST' });
    const data = await response.json();

    if (!data.success) {
      return res.status(400).json({ success: false, message: 'recaptcha failed', details: data['error-codes'] });
    }

    return res.json({ success: true, message: 'recaptcha passed' });
  } catch (error) {
    console.error('Error al validar recaptcha:', error);
    return res.status(500).json({ success: false, message: 'Internal server error validating recaptcha' });
  }
});

app.use(express.static(path.join(__dirname, 'angularapp')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'angularapp', 'index.html'));
});

app.listen(port, () => {
  console.log(`Clinica Online backend corriendo en http://localhost:${port}`);
});
