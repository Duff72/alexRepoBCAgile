// App.js
import "./App.css";
import React, { useState, useEffect } from "react";
import AddPost from "./addpost";
import PrimarySearchAppBar from "./searchnav";
import Sidebar1 from "./sidebar1";
import Sidebar2 from "./sidebar2";
import ShowPosts from "./showposts";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

function App() {
  const [posts, setPosts] = useState(JSON.parse(localStorage.getItem('posts')) || []);

  const addPost = (id, post, tags, dateCreated, image) => {
    const newPosts = [...posts, { id, post, tags, dateCreated, image }];
    setPosts(newPosts);
    localStorage.setItem('posts', JSON.stringify(newPosts)); // Save to local storage
  };

  const editPost = (index, updatedPost) => {
    const displayedPosts = [...posts]
      .sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
    const originalIndex = posts.findIndex(post => post.id === displayedPosts[index].id);
    const newPosts = posts.map((post, i) => (i === originalIndex ? updatedPost : post));
    setPosts(newPosts);
    localStorage.setItem('posts', JSON.stringify(newPosts)); 
  };

  const deletePost = (index) => {
    const displayedPosts = [...posts]
      .sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
    const originalIndex = posts.findIndex(post => post.id === displayedPosts[index].id);
    const newPosts = [...posts];
    newPosts.splice(originalIndex, 1);
    setPosts(newPosts);
    localStorage.setItem('posts', JSON.stringify(newPosts)); 
  };

  const loadPosts = () => {
    setPosts(JSON.parse(localStorage.getItem('posts'))||[]);
  }

  useEffect(() => {
    loadPosts();
  }, [posts]); 

  const getTrendingTags = () => {
    const tagFrequency = {};
    posts.forEach(post => {
      // Split the tags string by spaces or commas and iterate over each tag
      post.tags.split(/[\s,]+/).forEach(tag => {
        // Trim any leading or trailing whitespace from the tag
        const trimmedTag = tag.trim();
        if (trimmedTag) {
          // If the tag already exists in the frequency object, increment its count
          if (tagFrequency[trimmedTag]) {
            tagFrequency[trimmedTag]++;
          } else {
            // Otherwise, add the tag to the frequency object with a count of 1
            tagFrequency[trimmedTag] = 1;
          }
        }
      });
    });
    return Object.entries(tagFrequency)  // Convert object to array of [tag, count] pairs
      .sort(([, a], [, b]) => b - a)     // Sort the array by count in descending order
      .map(([tag]) => tag)               // Extract only the tags
      .slice(0, 5);                      // Return the top 5 tags
  };
  
  return (
    <div>
      <PrimarySearchAppBar />
      <Container maxWidth="lg" style={{ marginTop: '60px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Sidebar1 />
          </Grid>
          <Grid item xs={12} md={6}>
            <AddPost addPost={addPost} />
            <ShowPosts posts={posts} editPost={editPost} deletePost={deletePost} />
          </Grid>
          <Grid item xs={12} md={3}>
            <Sidebar2 trendingTags={getTrendingTags()} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
