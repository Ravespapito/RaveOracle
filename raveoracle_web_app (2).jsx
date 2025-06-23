import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function RaveOracleApp() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const generateOutfit = async () => {
    setLoading(true);
    setResponse("");
    setImageUrl("");

    const apiKey = "YOUR_OPENAI_API_KEY";

    const chatRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are a rave fashion stylist AI." },
          { role: "user", content: input },
        ],
        temperature: 0.9,
      }),
    });

    const chatData = await chatRes.json();
    const outfitText = chatData.choices?.[0]?.message?.content || "No outfit generated.";
    setResponse(outfitText);

    // Call DALL·E for image
    const dalleRes = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: `Rave outfit: ${outfitText}`,
        n: 1,
        size: "512x512"
      }),
    });

    const dalleData = await dalleRes.json();
    const imgUrl = dalleData.data?.[0]?.url;
    if (imgUrl) setImageUrl(imgUrl);

    setLoading(false);
  };

  const saveOutfit = () => {
    const saved = JSON.parse(localStorage.getItem("raveOracleSaves") || "[]");
    saved.push({ input, response, imageUrl, timestamp: Date.now() });
    localStorage.setItem("raveOracleSaves", JSON.stringify(saved));
    alert("Outfit saved to your local closet!");
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4 text-pink-400">RaveOracle 🔮</h1>
      <Card className="w-full max-w-xl bg-zinc-900">
        <CardContent className="p-4">
          <Textarea
            className="mb-4 text-white"
            placeholder="Describe your vibe, weather, body type, etc."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button className="w-full bg-pink-500 hover:bg-pink-600" onClick={generateOutfit} disabled={loading}>
            {loading ? "Generating..." : "Get My Rave Outfit"}
          </Button>
        </CardContent>
      </Card>

      {response && (
        <div className="mt-6 max-w-xl bg-zinc-800 p-4 rounded-xl shadow-xl">
          <h2 className="text-lg font-semibold text-lime-400 mb-2">Your AI-Styled Look ✨</h2>
          <p className="whitespace-pre-wrap text-white mb-4">{response}</p>
          {imageUrl && <img src={imageUrl} alt="Outfit preview" className="rounded-xl mb-4" />}
          <Button className="bg-emerald-500 hover:bg-emerald-600" onClick={saveOutfit}>Save This Look</Button>
        </div>
      )}
    </div>
  );
}
