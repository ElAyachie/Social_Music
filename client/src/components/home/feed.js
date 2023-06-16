import React, { useState } from 'react';
import axios from 'axios';
import api from '../../config/api';
import './feed.scss';

import './feed.scss';
import './NewComment.scss';

import favorite from '../../assets/note.png';
import commentIcon from '../../assets/comment.png'

import handleComment from './NewComment';
import NewComment from './NewComment';

import getImageByKey from '../profiles/getImageByKey';

function Feed() {
    const [posts, setPosts] = useState(JSON.parse(localStorage.getItem("posts")));
    const [comments, setComments] = useState(JSON.parse(localStorage.getItem("comments")));

    const user = JSON.parse(localStorage.getItem("user"));
    const UserID = user.UserID;


    // Work on posts
    const handlePostLike = async e =>  {
        let PostID = parseInt(e.target.dataset.postid);
        await axios.get(api.base_url + "/posts/likes/update", {
            params: {
                PostID: PostID
            }
            })
            .then(function(response) {
                console.log(response);
                console.log("Successful insert");
                // Add to the local storage
                PostID = 
                posts.filter(v => v.PostID === PostID)[0].Likes =  posts.filter(v => v.PostID === PostID)[0].Likes + 1
                setPosts([...posts]);
            })
            .catch(function(error) {
                console.log(error);
            });
        };

    function createNewPost() {
        // Get the post
        var post = document.getElementById("new-post");
        
        // Get the <span> element that closes the post
        var span = document.getElementsByClassName("close")[0];

        post.style.display = "block";

        // When the user clicks on <span> (x), close the post
        span.onclick = function () {
            post.style.display = "none";
        }

        // When the user clicks anywhere outside of the post, close it
        window.onclick = function (event) {
            if (event.target === post) {
                post.style.display = "none";
            }
        }

        post.onsubmit = function (event) {
            const dataObject = {
                PostID: null,
                PostText: event.target[0].value,
                FriendID: UserID,
                Username: user.Username,
                Name: user.Name,
                Likes: 0
            };
            setPosts([dataObject, ...posts]);
            localStorage.setItem("posts", JSON.stringify(posts));
        }
    }

    function closeComment() {
        // Get the modal
        var modal = document.getElementById("new-comment");
        
        modal.style.display = "none";
    }

    // Work on comments
    const handleAddNewComment = async e => {
        e.preventDefault();
        let PostID = e.target.dataset.postid;
        const CommentText = e.target.value;
        const UserID = UserID;
        const newComment = {
            PostID: PostID,
            CommentText: CommentText,
            UserID: UserID
        }
        await axios.post(api.base_url + "/comments/insert", newComment)
            .then(function(response) {
                console.log(response.data);
                console.log("New comment Successful");
                closeComment();
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    return (
        <div>
            <div className='feed-header'>
                <h3 className='feed-title'>My Feed</h3>
                <button className="new-post-btn" onClick={createNewPost}>New Post</button>
            </div>
        <div className="feed">
            {
                posts.map((post, index) =>
                    <div id={index} className="post">
                        <div className="userInfo">
                            <img className="picture" src={getImageByKey(post.Username)} width="45px" height="45px" alt="Profile pic"></img>
                            <br />
                            <h4 className="user">{post.Username}</h4>
                        </div>
                        <br />
                        <div className="postDataBox">
                            <p className="postData">{post.PostText}</p>
                        </div>
                        <br />
                        <div className="icons">
                            <div className="like-button-area">
                                <button className='like-button' data-postid={post.PostID} onClick={handlePostLike} >
                                    <img src={favorite} alt="Favorite icon" data-postid={post.PostID} className="icon like-button"/>
                                </button>
                                <p className="icon like-button">{post.Likes}</p>
                            </div>
                            <button onClick={handleComment} data-postid={post.PostID} className="commentBtn">
                                <img src={commentIcon} alt="Comment icon" className="icon" />
                            </button>
                        </div>
                        {
                            comments.filter(v => v.PostID === post.PostID).map((comment, key) =>
                                <div className="comment" id={key}>
                                    <div className="userInfo">
                                        <img src={getImageByKey(post.Username)} alt="User Profile" className="profileImg" />
                                        <br />
                                        <h4 className="user">{comment.Username}</h4>
                                    </div>
                                    <br />
                                    <div className="commentDataBox">
                                        <p className="commentData">
                                            {comment.CommentText}
                                        </p>
                                    </div>
                                    <br />
                                    <div className="icons">
                                        <img src={favorite} alt="Favorite icon" className="icon" />
                                        <button onClick={handleComment} data-postid={post.PostID} data-commenttext={comment.CommentText} className="commentBtn">
                                            <img src={commentIcon} alt="Comment icon" className="icon" />
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
        </div>
    );
}

export default Feed;