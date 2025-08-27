import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function Result({ translatedText, language, image }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
      <Card sx={{ minWidth: 345 }}>
        <CardMedia component="img" alt={language} height="140" image={image} />
        <CardContent>
          <Typography gutterBottom variant="body" component="div">
            {language}
          </Typography>
          <Typography variant="body3" sx={{ color: "text.secondary" }}>
            {translatedText}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Result;
