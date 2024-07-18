// AddPost.js
import './App.css';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function AddPost({ addPost }) {
  const [id, setId] = useState('');
  const [post, setPost] = useState('');
  const [tags, setTags] = useState('');
  const [dateCreated, setDateCreated] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setDateCreated(new Date().toISOString()); // Set the current date and time
    addPost(id, post, tags, new Date().toISOString());
    setId('');
    setPost('');
    setTags('');
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > :not(style)': { p:2, width: '50ch' },
        mt: 4,
        mb: 3,
        bgcolor: "#2D5D7B",
        p: 3,
        borderRadius:2
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField 
        id="user-id" 
        label="UserID" 
        variant="outlined" 
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <TextField 
        id="post" 
        label="Post" 
        variant="outlined" 
        multiline 
        rows={4} 
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />
        <TextField 
        id="tags" 
        label="Tags" 
        variant="outlined" 
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <Button variant="contained" type="submit">Submit</Button>
    </Box>
  );
}
