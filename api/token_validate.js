module.exports = async (request, response) => {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const token = request.body && request.body.recaptcha;
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!token) {
    return response.status(400).json({ success: false, message: 'Token is empty or invalid' });
  }

  if (!secret) {
    return response.status(500).json({ success: false, message: 'Missing reCAPTCHA configuration' });
  }

  try {
    const verification = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token })
    });
    const result = await verification.json();

    if (!result.success) {
      return response.status(400).json({ success: false, message: 'reCAPTCHA validation failed' });
    }

    return response.status(200).json({ success: true });
  } catch (error) {
    return response.status(502).json({ success: false, message: 'reCAPTCHA service unavailable' });
  }
};
