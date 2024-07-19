// Import necessary styles and libraries
import "./App.css";
import React, { useState, useEffect } from "react";
import AddPost from "./addpost";
import PrimarySearchAppBar from "./searchnav";
import Login from "./login";
import Sidebar1 from "./sidebar1";
import Sidebar2 from "./sidebar2";
import ShowPosts from "./showposts";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

function App() {
    // State variables to manage posts, filtered posts, filter status, login status, user ID, and profile picture
    const [posts, setPosts] = useState(JSON.parse(localStorage.getItem('posts')) || []);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [filterOn, setFilterOn] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [uid, setUid] = useState('');
    const [profPic, setProfPic] = useState("images/cat.jpeg");

    // Function to add a new post
    const addPost = (post, tags, dateCreated, image) => {
        const newPosts = [...posts, { id: isLoggedIn ? uid : 'Anonymous', post, tags, dateCreated, image, profPic: isLoggedIn ? profPic : "images/cat.jpeg" }];
        setPosts(newPosts);
        localStorage.setItem('posts', JSON.stringify(newPosts)); // Save to local storage
    };

    // Function to edit an existing post
    const editPost = (index, updatedPost) => {
        const displayedPosts = [...posts]
            .sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
        const originalIndex = posts.findIndex(post => post.id === displayedPosts[index].id && post.body === displayedPosts[index].body && post.tags === displayedPosts[index].tags);
        const newPosts = posts.map((post, i) => (i === originalIndex ? updatedPost : post));
        setPosts(newPosts);
        localStorage.setItem('posts', JSON.stringify(newPosts));
    };

    // Function to delete a post
    const deletePost = (index) => {
        const displayedPosts = [...posts]
            .sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
        const originalIndex = posts.findIndex(post => post.id === displayedPosts[index].id && post.body === displayedPosts[index].body && post.tags === displayedPosts[index].tags);
        const newPosts = [...posts];
        newPosts.splice(originalIndex, 1);
        setPosts(newPosts);
        localStorage.setItem('posts', JSON.stringify(newPosts));
    };

    // Function to search for posts based on a search term
    const searchPosts = (searchTerm) => {
        // Convert the search term to lowercase for case-insensitive comparison
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        // Filter posts by user ID
        const filteredPostsById = posts.filter(post => post.id.toLowerCase() === lowerCaseSearchTerm);
        // Filter posts by tags
        const filteredPostsByTag = posts.filter(post =>
            post.tags.split(/[\s,]+/).some(tag => tag.trim().toLowerCase() === lowerCaseSearchTerm)
        );
        // Combine filtered posts without duplicates
        const combinedFilteredPosts = [...new Set([...filteredPostsById, ...filteredPostsByTag])];
        setFilteredPosts(combinedFilteredPosts);
        localStorage.setItem('filteredposts', JSON.stringify(filteredPosts));
        setFilterOn(true);
    };

    // Function to handle login/logout
    const logInOut = (username, ProfPic, loginState) => {
        setIsLoggedIn(loginState);
        setUid(username);
        setProfPic(ProfPic);
    };

    // Function to load posts from local storage
    const loadPosts = () => {
        setPosts(JSON.parse(localStorage.getItem('posts')) || []);
    };

    // useEffect hook to load posts when the component mounts
    useEffect(() => {
        loadPosts();
    }, []);

    // Function to get trending tags from posts
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
            {/* Primary search app bar component */}
            <PrimarySearchAppBar searchPosts={searchPosts} />
            <Container maxWidth="lg" style={{ marginTop: '60px' }}>
                <Grid container spacing={2}>
                    {/* Sidebar and login components */}
                    <Grid item xs={12} md={3}>
                        <Sidebar1 uid={uid} profPic={profPic} />
                        {isLoggedIn ? <Login logInOut={logInOut} isLoggedIn={isLoggedIn} uid={uid} fullWidth /> : null}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {!isLoggedIn ? <Login logInOut={logInOut} isLoggedIn={isLoggedIn} uid={uid} /> : null}
                        {/* Add post component */}
                        <AddPost addPost={addPost} isLoggedIn={isLoggedIn} uid={uid} profPic={profPic}/>
                        {/* Show posts component */}
                        {filterOn ? (
                            <ShowPosts posts={filteredPosts} editPost={editPost} deletePost={deletePost} />
                        ) : (
                            <ShowPosts posts={posts} editPost={editPost} deletePost={deletePost} />
                        )}
                    </Grid>
                    {/* Sidebar with trending tags */}
                    <Grid item xs={12} md={3}>
                        <Sidebar2 trendingTags={getTrendingTags()} />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default App;
