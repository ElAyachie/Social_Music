import React, { useState } from 'react';
import axios from 'axios';
import './NewComment.scss';

import api from '../../config/api';

function closeComment() {
    // Get the modal
    var modal = document.getElementById("new-comment");
    
    modal.style.display = "none";
}

// Creating a new Comment function, displays to the user on the page and saves the data to the database.
function NewCommentPopup() {
    const [commentText, setCommentText] = useState('');

    return(
        <div id="new-comment" className="new-comment">
            <div className="new-comment-content">
                <div onClick={closeComment} className="close-space">
                    <span className="comment-close">&times;</span>
                </div>
                <div className="comment-space">
                    <form>
                        <textarea
                        className="form-control"
                        type="text"
                        autoComplete="on"
                        id="commentText"
                        required
                        name="commentText"
                        placeholder="What's on your mind?"
                        rows="5"
                        value={commentText}
                        onChange={(e) => {
                            setCommentText(e.target.value);
                        }}
                        />

                        <button type="submit" className="new-comment-button">
                            Add New Comment
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewCommentPopup;