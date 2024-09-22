import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
const MovieItem = ({ title, releaseDate, posterUrl, id }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        width: {
          xs: "100%",
          sm: 250,
          "md": 280,
        },
        borderRadius: 3,
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      <img
        width="100%"
        height="350px"
        src={posterUrl}
        style={{
          objectFit: "cover",
        }}
      />
      <CardContent
        sx={{
          flex: 1,
          padding: 2,
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="div"
        // sx={{
        //   whiteSpace: "nowrap",
        //   overflow: "hidden",
        //   textOverflow: "ellipsis",
        // }}
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(releaseDate).toDateString()}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          marginTop: "auto",
        }}
      >
        <Button
          LinkComponent={Link}
          to={`/booking/${id}`}
          size="small"
          sx={{
            margin: "auto",
            bgcolor: "#1c0840",
            ":hover": {
              bgcolor: "#121217",
            },
            padding: 1,
            borderRadius: 2,
          }}
          variant="contained"
          fullWidth
        >
          Book
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieItem;
