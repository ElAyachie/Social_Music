import React, { useState } from 'react';
import './post.scss';
import favoriteIcon from '../../assets/note.png';
import commentIcon from '../../assets/comment.png';
import axios from 'axios';
import api from '../../config/api';
import Comment from '../comment/Comment'

function closeComment() {
    // Get the modal
    var modal = document.getElementById("new-comment");
    
    modal.style.display = "none";
}

// Design for each individual post.
function Post(props) {
    const [post, setPost] = useState(props.post);
    const [comments, setComments] = useState(props.comments);
    const [postUser] = useState(props.postUser);
    const user = JSON.parse(localStorage.getItem("user"));
    const UserID = user.UserID;
    const users = JSON.parse(localStorage.getItem("users"));
    
    function openComment() {
        // Get the comment
        var comment = document.getElementById("new-comment");
    
        // Get the <span> element that closes the comment
        var commentClose = document.getElementsByClassName("comment-close")[0];
    
        var textarea = document.getElementsByClassName("textarea-comment")[0];
        textarea.value = "";

        comment.style.display = "block";

        commentClose.onclick = function() {
            comment.style.display = "none";
        }

        comment.dataset.postid = post.PostID;
    
        // When the user clicks anywhere outside of the comment, close it
        window.onclick = function(e) {
            if (e.target === comment) {
                comment.style.display = "none";
            }
        }

        comment.onsubmit = function(e) {
            e.preventDefault();
            handleNewComment(e);
        }
    }

    const handlePostLike = async e =>  {
        e.preventDefault();
        await axios.get(api.base_url + "/posts/likes/update", {
                params: {
                    PostID: post.PostID
                }
            })
            .then(function(response) {
                // Add to the local storage
                setPost({ ...post, PostLikes: post.PostLikes + 1 });
            })
            .catch(function(error) {
                console.log(error);
            });
        };

    const handleNewComment = async e => {
        e.preventDefault();
        const PostID = parseInt(post.PostID);
        const CommentText = e.target[0].value;
        const newComment = {
            PostID: PostID,
            UserID: UserID,
            CommentText: CommentText
        }
        await axios.post(api.base_url + "/comments/insert", newComment)
            .then(function(response) {
                const newComment = response.data.comments[0][0];
                setComments(oldComments => [newComment, ...oldComments]);
                closeComment();
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    return (
        <div className="post">
            <div id={post.PostID}>
                <div className="userInfo">
                    <img className="picture profileImg" id="post-profile-image" src={postUser.ProfileImage} width="45px" height="45px" alt="Profile pic"></img>
                    <br />
                    <h4 className="user">{"@" + post.Username}</h4>
                </div>
                <br />
                <div className="postDataBox">
                    <p className="postData">{post.PostText}</p>
                </div>
                <br />
                <div className="icons">
                    <div className="like-button-area">
                        <button className='like-button' data-postid={post.PostID} onClick={handlePostLike} >
                            <img src={favoriteIcon} alt="Favorite icon" data-postid={post.PostID} className="icon like-button"/>
                        </button>
                        <p className="icon like-button">{post.PostLikes}</p>
                    </div>
                    <button onClick={openComment} data-postid={post.PostID} className="commentBtn">
                        <img src={commentIcon} alt="Comment icon" className="icon" />
                    </button>
                </div>
                <div className='comments'>
                    {comments.map((comment) =>
                        <Comment comment={comment} post={post} commentUser={users.filter(x => x.UserID === comment.FriendID)[0]} key={comment.CommentID}/>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Post;