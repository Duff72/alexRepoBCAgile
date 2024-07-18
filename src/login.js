import './App.css';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Login({ logInOut, isLoggedIn, uid }) {
    const [username, setUsername] = useState(uid || '');
    const [profPic, setProfPic] = useState()

    const handleSubmit = (event) => {
        event.preventDefault();
        logInOut(username, true);
    };

    const handleLogout = (event) => {
        event.preventDefault();
        logInOut('', false);
        setUsername('');
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
                    />
                    <></>
                    <Button variant="contained" type="submit">Login</Button>
                </>
            )}
        </Box>
    );
}
