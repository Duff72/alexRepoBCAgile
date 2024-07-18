import './App.css';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

export default function Login({ logInOut, isLoggedIn, uid }) {
    const [username, setUsername] = useState(uid || '');
    const profPics = ["images/cat.jpeg", "images/elephant.jpeg", "images/nutty.jpeg", "images/zebra.jpeg"];
    const [profPic, setProfPic] = useState(profPics[0]);
    const handleSubmit = (event) => {
        event.preventDefault();
        logInOut(username, profPic, true);
    };

    const handleLogout = (event) => {
        event.preventDefault();
        logInOut('', "images/cat.jpeg", false);
        setUsername('');
    };

    const handleAvatarClick = (index) => {
        setProfPic(profPics[index]);
    };

    return (
        <Box
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& > :not(style)': { p: 2, width: '50ch' },
                mt: 4,
                mb: 3,
                bgcolor: "#2D5D7B",
                p: 3,
                borderRadius: 2
            }}
            noValidate
            autoComplete="off"
            onSubmit={isLoggedIn ? handleLogout : handleSubmit}
        >
            {isLoggedIn ? (
                <>
                    <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                        Are you sure you want to logout?
                    </Typography>
                    <Button variant="contained" type="submit">Logout</Button>
                </>
            ) : (
                <>
                    <TextField
                        id="username"
                        label="Username"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        InputProps={{
                            style: { backgroundColor: '#ADB5BD', color: 'black', padding: '10px' }
                        }}
                        InputLabelProps={{
                            style: { color: 'black', padding: '10px' }
                        }}
                        inputProps={{
                        maxLength: 20 
                        }}
                    />
                        <div style={{ display: 'flex' }}><Avatar onClick={() => handleAvatarClick(0)} src="images/cat.jpeg"></Avatar>
            <Avatar onClick={() => handleAvatarClick(1)} src="images/elephant.jpeg"></Avatar>
            <Avatar onClick={() => handleAvatarClick(2)} src="images/nutty.jpeg"></Avatar>
            <Avatar onClick={() => handleAvatarClick(3)} src="images/zebra.jpeg"></Avatar></div>
                    <Button variant="contained" type="submit">Login</Button>
                </>
            )}
</Box>
    );
}
