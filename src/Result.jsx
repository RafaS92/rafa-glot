import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";

function Result({ translatedText, language, image, loadingImage }) {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", mt: 2, width: "100%" }}
    >
      <Card sx={{ width: 345 }}>
        {loadingImage ? (
          <Box
            sx={{
              height: 0,
              paddingTop: "100%", // square aspect ratio for loader
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <CardMedia
            component="img"
            alt={language}
            image={image}
            sx={{
              width: "100%",
              height: "auto", // auto height preserves aspect ratio
              maxHeight: 250, // optional: prevent extremely tall images
              display: "block",
            }}
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="body1" component="div">
            {language}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {translatedText}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Result;
