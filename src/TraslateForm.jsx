import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
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
  const [language, setLanguage] = useState("es"); // default Spanish
  const [translatedText, setTranslatedText] = useState("");
  const [image, setImage] = useState(null);

  const handleTranslate = async () => {
    if (!text) return;

    setLoadingTraslation(true);
    setLoadingImagen(true);
    setTranslatedText("");
    setImage(null);
    try {
      // Translation
      const res = await fetch("http://localhost:3001/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, language }),
      });
      const data = await res.json();
      setLoadingTraslation(false);
      setTranslatedText(data.translation);

      // Image generation
      const imgRes = await fetch("http://localhost:3001/api/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text }),
      });
      const imgData = await imgRes.json();
      setLoadingImagen(false);
      setImage(`data:image/png;base64,${imgData.image}`);
    } catch (err) {
      console.error(err);
      setTranslatedText("Error: Could not translate.");
    }
  };

  return (
    <div className="translator-container">
      <h2>Welcome to RafaGlot!</h2>
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
        onChange={(e) => setText(e.target.value)}
        fullWidth
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

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 4 }}>
        <Button onClick={handleTranslate} variant="contained">
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
    </div>
  );
}
