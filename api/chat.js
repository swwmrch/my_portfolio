export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, systemPrompt } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'No message provided' });
  }

  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 300,
        system: systemPrompt || 'You are a helpful assistant.',
        messages: [
          { role: 'user', content: message }
        ]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Anthropic API error:', response.status, errText);
      return res.status(502).json({ error: `API error ${response.status}: ${errText.slice(0, 200)}` });
    }

    const data = await response.json();
    const reply = data?.content?.[0]?.text || 'No response.';
    return res.status(200).json({ reply });

  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: err.message || 'API error' });
  }
}
