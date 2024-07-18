import './App.css';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import imageCompression from 'browser-image-compression';

export default function AddPost({ addPost, isLoggedIn, uid, profPic }) {
    const [post, setPost] = useState('');
    const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
    const [dateCreated, setDateCreated] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
      };

      try {
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onloadend = () => {
          setImage(compressedFile);
          setImagePreview(reader.result);
        };
      } catch (error) {
        console.error('Error compressing the image', error);
      }
    }
  };

    const handleSubmit = (event) => {
        event.preventDefault();
        const currentDate = new Date().toISOString(); // Set the current date and time
    setDateCreated(currentDate);
    if(post !== ''){
        addPost(post, tags, currentDate, imagePreview); // Pass the imagePreview URL and dateCreated
        setPost('');
        setTags('');
    setImage(null);
    setImagePreview(null);}
    else{return}
    };

    return (
        <Box
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& > :not(style)': { p:  2, width: '50ch' },
                mt: 4,
                mb: 3,
                bgcolor: "#2D5D7B",
                p: 3,
                borderRadius:  2
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            {isLoggedIn ? (
                <Typography variant="h6" sx={{ color: 'white', ml: 4}}>
                    Posting as {uid}
                </Typography>
            ) : (
                <Typography variant="h6" sx={{ color: 'white', ml: 4}}>
                    Posting as Anonymous
                </Typography>

            )}
            <TextField
                id="post"
                label="Post"
                variant="outlined"
                multiline
                rows={4}
                value={post}
                onChange={(e) => setPost(e.target.value)}
                InputProps={{
                    style: { backgroundColor: '#ADB5BD', color: 'black', padding: '10px' }
                }}
                InputLabelProps={{
                    style: { color: 'black', padding: '10px'  }
                }}
                inputProps={{
                        maxLength: 280 
                        }}
            />
          <TextField
                id="tags"
                label="Tags"
                variant="outlined"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                InputProps={{
                    style: { backgroundColor: '#ADB5BD', color: 'black', padding: '10px'  }
                }}
                InputLabelProps={{
                    style: { color: 'black', padding: '10px' }
                }}
                inputProps={{
                        maxLength: 280 
                        }}
            />
            <Button
        variant="contained"
        component="label"
        sx={{ mt: 2, mb: 2 }}
      >
        Upload Image
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleImageUpload}
        />
      </Button>
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          style={{
            marginTop: '10px',
            maxWidth: '100%',
            height: 'auto',
            objectFit: 'cover',
            borderRadius: '8px',
          }}
        />
      )}
      <Button variant="contained" type="submit">Submit</Button>
        </Box>
    );
}

