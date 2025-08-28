import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Result from "./Result";
import "./TraslateForm.css";

const languages = [
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "sk", label: "Slovak" },
  { value: "zh", label: "Chinese" },
  { value: "hi", label: "Hindi" },
];

export default function TranslateForm() {
  const [text, setText] = useState("");
  const [loadingTraslation, setLoadingTraslation] = useState(false);
  const [loadingImage, setLoadingImagen] = useState(false);
  const [error, setError] = useState("");
  const [language, setLanguage] = useState("es");
  const [translatedText, setTranslatedText] = useState("");
  const [image, setImage] = useState(null);

  const bottomRef = useRef(null);

  useEffect(() => {
    if (translatedText) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [translatedText, image]);

  const handleTranslate = async () => {
    if (!text) return;

    setError("");
    setLoadingTraslation(true);
    setLoadingImagen(true);
    setTranslatedText("");
    setImage(null);

    const API_URL = process.env.REACT_APP_BACKEND_URL;

    try {
      const res = await fetch(`${API_URL}/api/translate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, language }),
      });
      const data = await res.json();
      setLoadingTraslation(false);
      setTranslatedText(data.translation);

      // Image generation request
      const imgRes = await fetch(`${API_URL}/api/image`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text }),
      });
      const imgData = await imgRes.json();
      setLoadingImagen(false);
      setImage(`data:image/png;base64,${imgData.image}`);
    } catch (err) {
      setError("Sorry, there has been an error. Please try again.");
      setTranslatedText("");
      setLoadingTraslation(false);
      setLoadingImagen(false);
    }
  };

  return (
    <div className="translator-container">
      <h1 className="title">Welcome to RafaGlot!</h1>
      <Chip
        label={languages.find((l) => l.value === language)?.label}
        variant="outlined"
        color="primary"
        sx={{ mb: 2 }}
      />

      <TextField
        label="Enter text to translate"
        variant="outlined"
        multiline
        rows={4}
        value={text}
        onChange={(e) => {
          const words = e.target.value.trim().split(/\s+/);
          if (words.length <= 15) {
            setText(e.target.value);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleTranslate();
          }
        }}
        fullWidth
        helperText={`${
          text.trim() === "" ? 0 : text.trim().split(/\s+/).length
        }/15 words`}
      />

      <div className="translator-languages">
        <Box sx={{ mt: 2, mb: 2, minWidth: 200 }}>
          <TextField
            select
            label="Select Language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            fullWidth
          >
            {languages.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </div>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 4 }}>
        <Button
          onClick={handleTranslate}
          variant="contained"
          disabled={text.trim().split(/\s+/).filter(Boolean).length === 0}
        >
          Translate
        </Button>
      </Box>

      {loadingTraslation && <p>Translating...</p>}
      {translatedText && (
        <Result
          translatedText={translatedText}
          image={image}
          loadingImage={loadingImage}
          language={languages.find((l) => l.value === language)?.label}
        />
      )}

      <div ref={bottomRef}></div>
    </div>
  );
}
