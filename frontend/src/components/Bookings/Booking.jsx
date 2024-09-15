import { Button, FormLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieDetails, newBooking } from "../../apiservice/apiservice";

const Booking = () => {
  const navigate = useNavigate();
  const [movie, setMovie] = useState();
  const [inputs, setInputs] = useState({ seatNumber: "", date: "" });
  const id = useParams().id;
  console.log(id);

  useEffect(() => {
    getMovieDetails(id)
      .then((res) => setMovie(res.movie))
      .catch((err) => console.log(err));
  }, [id]);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    newBooking({ ...inputs, movie: movie._id })
      .then((res) => {
        navigate("/user");
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      {movie && (
        <Fragment>
          <Typography
            padding={3}
            fontFamily="fantasy"
            variant="h4"
            textAlign={"center"}
          >
            Book TIckets Of Movie: {movie.title}
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr", // Single column on extra-small screens (mobile)
                sm: "1fr 1fr", // Two columns on small screens (tablet)
                md: "1fr 1fr 1fr", // Three columns on medium screens and above
              },
              padding: {
                xs: 2, // Padding for extra-small screens (mobile)
                sm: 4, // Padding for small screens (tablet)
                md: 8, // Padding for medium screens and above
              },
              gap: {
                xs: 2, // Gap for extra-small screens (mobile)
                sm: 4, // Gap for small screens (tablet)
                md: 8, // Gap for medium screens and above
              },
            }}
          >
            <img width="100%" src={movie.posterUrl} alt={movie.title} />
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="h5">{movie.description}</Typography>
              {movie.actors.length > 0 ? (
                <Typography>Starrer: {movie.actors.join(", ")}</Typography>
              ) : null}
              <Typography variant="body2">
                Release Date: {new Date(movie.releaseDate).toDateString()}
              </Typography>
            </Box>
            <Box>
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  gap: 8,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <FormLabel>Seat Number</FormLabel>
                  <TextField
                    name="seatNumber"
                    value={inputs.seatNumber}
                    onChange={handleChange}
                    type="number"
                    margin="normal"
                    variant="standard"
                    placeholder="i.e. 15"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <FormLabel>Booking Date</FormLabel>
                  <TextField
                    name="date"
                    type="date"
                    margin="normal"
                    variant="standard"
                    value={inputs.date}
                    onChange={handleChange}
                    defaultValue={new Date().toISOString().slice(0, 10)}
                  />
                </Box>
                <Button
                  type="submit"
                  sx={{
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
                  Book Now
                </Button>
              </form>
            </Box>
          </Box>
        </Fragment>
      )}
    </div>
  );
};

export default Booking;
