import React, { useState, useEffect } from 'react';

import Post from '../post/Post'
import NewPostPopup from '../post/NewPostPopup';
import NewCommentPopup from '../comment/NewCommentPopup';
import api from '../../config/api';
import axios from 'axios';

// need to figure out if i can move these somewhere else
function closePost() {
    // Get the modal
    var modal = document.getElementById("new-post");
    
    modal.style.display = "none";
}

function ProfileFeed() {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const UserID = user.UserID;
    const users = JSON.parse(localStorage.getItem("users"));
    
    useEffect(() => {
        const getPosts  = async e  =>  {
            await axios.get(api.base_url + '/posts/profile/get', {
                    params: {
                        UserID: UserID
                    }
                })
                .then(function(response) {
                    if (response.data.code === 200) {
                        const resultPosts = response.data.posts[0];
                        setPosts(resultPosts);
                    }
                })
            }
        const getComments  = async e  =>  {
        await axios.get(api.base_url + '/comments/profile/get', {
                params: {
                    UserID: UserID
                }
            })
            .then(function(response) {
                if (response.data.code === 200) {
                    const resultComments = response.data.comments[0];
                    setComments(resultComments);
                    getPosts();
                }
            })
        }
        getComments();
    }, [UserID]);
    
    const handleNewPost = async e => {
        e.preventDefault();
        const PostText = e.target[0].value;
        const newPost = {
            UserID: UserID,
            PostText: PostText
        }   

        await axios.post(api.base_url + "/posts/insert", newPost)
            .then(function(response) {
                const newPost = response.data.posts[0][0];
                setPosts(oldPosts => [newPost, ...oldPosts]);
                closePost();
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    function createNewPost() {
        // Get the post
        var post = document.getElementById("new-post");

        post.style.display = "block";

        var textarea = document.getElementsByClassName("textarea-post")[0];
        textarea.value = "";
        
        // Get the <span> element that closes the post
        var postClose = document.getElementsByClassName("post-close");

        // When the user clicks on <span> (x), close the post
        postClose.onclick = function () {
            post.style.display = "none";
        }

        // When the user clicks anywhere outside of the post, close it
        window.onclick = function (e) {
            if (e.target === post) {
                post.style.display = "none";
            }
        }
    }

    return (
        <div>
            <div className='feed-header'>
                <h3 className='feed-title'>My Feed</h3>
                <button className="new-post-btn" onClick={createNewPost}>New Post</button>
            </div>
            <div className="feed">
                <NewCommentPopup />
                <NewPostPopup newPost={handleNewPost}/>    
                {posts.map((post) =>
                    <Post post={post} postUser={users.filter(x => x.UserID === post.UserID)[0]} comments={comments.filter(v => v.PostID === post.PostID)} key={post.PostID}/>
                )}
            </div>
        </div>
    );
}

export default ProfileFeed;