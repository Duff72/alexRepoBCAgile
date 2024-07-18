import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

const Sidebar1 = () => {
  return (
    <Box
      className="sidebar"
      mt={4}
      mb={3}
      p={4}
      borderRadius={2}
      textAlign="center"
      sx={{
        bgcolor: "#2D5D7B",
        color: "white",
        
      }}
    >
      <Box mb={3}>
        <Avatar
          src="images/cat.jpeg"
          alt="Profile"
          sx={{ width: 100, height: 100, margin: "0 auto" }}
        />
      </Box>
      <Box mb={3}>
        <Typography variant="h5">Willie Nelson</Typography>
        <Typography variant="body2" sx={{ color: "#ADB5BD" }}>
          Graphic Designer
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-around" mb={3}>
        <Box textAlign="center">
          <Typography variant="body2">Following</Typography>
          <Typography variant="h6">34</Typography>
        </Box>
        <Box textAlign="center">
          <Typography variant="body2">Followers</Typography>
          <Typography variant="h6">155</Typography>
        </Box>
      </Box>
      <Button variant="contained" color="primary">
        View Profile
      </Button>
    </Box>
  );
};

export default Sidebar1;
