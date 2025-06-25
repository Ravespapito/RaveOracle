import React, { useState } from "react";

function App() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const askAI = async () => {
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: question }),
    });
    const data = await res.json();
    setResponse(data.reply);
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1 style={{ fontSize: "2.5rem" }}>🪩 RaveOracle</h1>
      <p style={{ marginTop: "0.5rem" }}>Dress Hard. Rave Harder.</p>
      <input
        type="text"
        placeholder="Describe your rave vibe..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{
          marginTop: "2rem",
          padding: "0.75rem",
          width: "80%",
          fontSize: "1rem",
          borderRadius: "8px"
        }}
      />
      <br />
      <button
        onClick={askAI}
        style={{
          marginTop: "1rem",
          padding: "0.75rem 2rem",
          fontSize: "1rem",
          backgroundColor: "magenta",
          border: "none",
          borderRadius: "8px",
          color: "white",
          cursor: "pointer"
        }}
      >
        Generate Outfit
      </button>
      {response && (
        <div style={{ marginTop: "2rem", fontSize: "1.1rem" }}>
          <strong>Suggested Outfit:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default App;
