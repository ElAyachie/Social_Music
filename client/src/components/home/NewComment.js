import React, { /*useEffect,*/ useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './NewComment.scss';

import api from '../../config/api';


function closeComment() {
    // Get the modal
    var modal = document.getElementById("new-comment");
    
    modal.style.display = "none";
}

// Creating a new comment. (in progress)
function NewComment() {
    const [CommentText, setCommentText] = useState('');
    const user = JSON.parse(localStorage.getItem("user"));
    const UserID = user.UserID;

    const handleAddNewComment = async e => {
        e.preventDefault();
        let PostID = parseInt(e.target.dataset.postid);
        const CommentText = e.target.value;
        const newComment = {
            PostID: PostID,
            CommentText: CommentText,
            UserID: UserID
        }
        await axios.post(api.base_url + "/comments/insert", newComment)
            .then(function(response) {
                console.log("New comment Successful");
                closeComment();
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    return(
        <div id="new-comment" className="new-comment">
            <div className="new-comment-content">
                <div className="close-space">
                    <span className="close">&times;</span>
                </div>
                <div className="comment-space">
                    <form onSubmit={handleAddNewComment}>
                        <textarea
                        className="form-control"
                        type="text"
                        autoComplete="on"
                        id="commentText"
                        required
                        name="commentText"
                        placeholder="What's on your mind?"
                        rows="5"
                        value={CommentText}
                        onChange={(e) => {
                            setCommentText(e.target.value);
                        }}
                        />
                        <button type="submit" className="new-comment-button">
                            Add New comment
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewComment;