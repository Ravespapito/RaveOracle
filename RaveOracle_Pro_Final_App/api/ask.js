export default async function handler(req, res) {
  if (req.method === "POST") {
    const { prompt } = req.body;
    const reply = `Mock outfit suggestion for: "${prompt}"\n🔗 Link: https://iheartraves.com`;
    res.status(200).json({ reply });
  } else {
    res.status(405).end();
  }
}
