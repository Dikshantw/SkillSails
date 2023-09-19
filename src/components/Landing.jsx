import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
const theme = createTheme({
  typography: {
    fontFamily: "Noto Emoji",
    fontSize: 24, // Font size of 48 pixels
    lineHeight: "1.2em", // Line height of 1.2em
    color: "#000000", // Text color in black (#000000)
    fontWeight: "regular",
  },
});
export const typographyTheme = createTheme({
  typography: {
    fontFamily: "Jua, sans-serif", // Use the Jua font or your imported font
    fontSize: 80, // Font size of 80 pixels
    lineHeight: "1.1em", // Line height of 1.1em
    color: "rgba(0, 0, 0, 1)", // Text color in black
  },
});
function Landing() {
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#f2542d",
          width: "100%",
          height: 800,
          display: "flex",
          alignItems: "center", // Vertically center the content
          justifyContent: "center", // Horizontally center the content
        }}
      >
        <Card
          sx={{
            bgcolor: "#f2542d",
            width: 1000,
            height: "auto",
            textAlign: "center",
            boxShadow: "none",
            display: "flex", // Add display flex
            flexDirection: "column", // Vertically center the content
            alignItems: "center", // Horizontally center the content
            paddingTop: 0, // Remove top padding
          }}
        >
          <ThemeProvider theme={theme}>
            <Typography
              gutterBottom
              variant="h5"
              style={{ marginTop: 0, marginBottom: 60 }}
            >
              ⛵
            </Typography>
          </ThemeProvider>

          <ThemeProvider theme={typographyTheme}>
            <div style={{ width: 800, height: 176, marginBottom: 60 }}>
              <Typography variant="body2">
                Empower Your Skills with SkillSails
              </Typography>
            </div>
          </ThemeProvider>

          <Stack spacing={2} direction="row" style={{ marginTop: 60 }}>
            <Button
              variant="contained"
              style={{
                borderRadius: 9999,
                backgroundColor: "#f5dfbb",
                color: "#562c2c",
                fontSize: "16px",
                lineHeight: "1.5em",
                fontWeight: "medium",
                padding: "16px 32px",
              }}
              onClick={() => {
                navigate("/courses");
              }}
            >
              Explore Courses
            </Button>
            <Button
              variant="contained"
              style={{
                borderRadius: 9999,
                backgroundColor: "#127475",
                color: "#ffffff",
                fontSize: "16px",
                lineHeight: "1.5em",
                fontWeight: "medium",
                padding: "16px 32px",
              }}
              onClick={() => {
                navigate("/signup");
              }}
            >
              Become Instructor
            </Button>
          </Stack>
        </Card>
      </Box>
    </>
  );
}
export default Landing;
