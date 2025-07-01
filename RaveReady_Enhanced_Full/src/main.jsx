import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";

const App = () => {
  const [question, setQuestion] = useState("What kind of rave outfit are you looking for?");
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");

  const askAI = async () => {
    const res = await axios.post("/api/ai-assistant", { message: userInput });
    setResponse(res.data.reply);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1 style={{ color: "#fff", fontSize: "2rem" }}>🎧 RaveReady AI Assistant</h1>
      <p style={{ color: "#ccc" }}>{question}</p>
      <input
        type="text"
        placeholder="Describe your vibe..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        style={{ padding: "0.5rem", width: "100%", marginTop: "1rem" }}
      />
      <button onClick={askAI} style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}>
        Ask AI
      </button>
      {response && <div style={{ marginTop: "2rem", color: "#0f0" }}>{response}</div>}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
