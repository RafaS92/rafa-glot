import React, { useState } from "react";
import "./TraslateForm.css";

export default function TranslateForm() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("es"); // default Spanish
  const [translatedText, setTranslatedText] = useState("");

  const handleTranslate = () => {
    // For now just mock translation
    setTranslatedText(`Translated "${text}" to ${language}`);
  };

  return (
    <div className="translator-container">
      <h2>🌍 Translator App</h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to translate..."
        rows={4}
        className="translator-textarea"
      />

      <div className="translator-languages">
        <h4>Select Language:</h4>
        <label>
          <input
            type="radio"
            value="es"
            checked={language === "es"}
            onChange={(e) => setLanguage(e.target.value)}
          />
          Spanish
        </label>

        <label>
          <input
            type="radio"
            value="fr"
            checked={language === "fr"}
            onChange={(e) => setLanguage(e.target.value)}
          />
          French
        </label>

        <label>
          <input
            type="radio"
            value="de"
            checked={language === "de"}
            onChange={(e) => setLanguage(e.target.value)}
          />
          German
        </label>

        <label>
          <input
            type="radio"
            value="zh"
            checked={language === "zh"}
            onChange={(e) => setLanguage(e.target.value)}
          />
          Chinese
        </label>

        <label>
          <input
            type="radio"
            value="hi"
            checked={language === "hi"}
            onChange={(e) => setLanguage(e.target.value)}
          />
          Hindi
        </label>
      </div>

      <button onClick={handleTranslate} className="translator-button">
        Translate
      </button>

      {translatedText && (
        <div className="translator-result">
          <h4>Result:</h4>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
}
