export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    // Call Hugging Face Inference API (replace with your model endpoint)
    const response = await fetch("https://api-inference.huggingface.co/models/gpt2", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HF_API_KEY}`, // store in Vercel env vars
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: message })
    });

    const data = await response.json();

    res.status(200).json({ reply: data[0]?.generated_text || "No response" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
