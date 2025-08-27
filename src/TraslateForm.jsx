import React, { useState } from "react";

export default function TraslateForm() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("es"); // default Spanish
  const [translatedText, setTranslatedText] = useState("");

  const handleTranslate = () => {
    // For now just mock translation
    setTranslatedText(`Translated "${text}" to ${language}`);

    // Later you can replace this with a call to an API
    // Example with fetch to your backend:
    // fetch("/api/translate", { method: "POST", body: JSON.stringify({ text, language }) })
    //   .then(res => res.json())
    //   .then(data => setTranslatedText(data.translation));
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
      <h2>🌍 Translator App</h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to translate..."
        rows={4}
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />

      <div style={{ marginBottom: 15 }}>
        <h4>Select Language:</h4>
        <label style={{ display: "block", marginBottom: 5 }}>
          <input
            type="radio"
            value="es"
            checked={language === "es"}
            onChange={(e) => setLanguage(e.target.value)}
          />
          Spanish
        </label>

        <label style={{ display: "block", marginBottom: 5 }}>
          <input
            type="radio"
            value="fr"
            checked={language === "fr"}
            onChange={(e) => setLanguage(e.target.value)}
          />
          French
        </label>

        <label style={{ display: "block", marginBottom: 5 }}>
          <input
            type="radio"
            value="de"
            checked={language === "de"}
            onChange={(e) => setLanguage(e.target.value)}
          />
          German
        </label>

        <label style={{ display: "block", marginBottom: 5 }}>
          <input
            type="radio"
            value="zh"
            checked={language === "zh"}
            onChange={(e) => setLanguage(e.target.value)}
          />
          Chinese
        </label>

        <label style={{ display: "block", marginBottom: 5 }}>
          <input
            type="radio"
            value="hi"
            checked={language === "hi"}
            onChange={(e) => setLanguage(e.target.value)}
          />
          Hindi
        </label>
      </div>

      <button
        onClick={handleTranslate}
        style={{
          padding: "10px 20px",
          width: "100%",
          background: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Translate
      </button>

      {translatedText && (
        <div
          style={{
            marginTop: 20,
            padding: 10,
            border: "1px solid #ddd",
            borderRadius: 5,
            background: "#f9f9f9",
          }}
        >
          <h4>Result:</h4>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
}
