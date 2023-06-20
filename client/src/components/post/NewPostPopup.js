import React, { useState } from 'react';
import './NewPost.scss';

function closePost() {
    // Get the modal
    var modal = document.getElementById("new-post");

    modal.style.display = "none";
}

// Creating a new post function, displays to the user on the page and saves the data to the database.
function NewPostPopup(props) {
    const [PostText, setPostText] = useState('');

    return(
        <div id="new-post" className="new-post">
            <div className="new-post-content">
                <div className="close-space">
                    <span onClick={closePost} className="post-close">&times;</span>
                </div>
                <div className="post-space">
                    <form onSubmit={props.newPost}>
                        <textarea
                        className="form-control textarea-post"
                        type="text"
                        autoComplete="on"
                        id="postText"
                        required
                        name="postText"
                        placeholder="What's on your mind?"
                        rows="5"
                        value={PostText}
                        onChange={(e) => {
                            setPostText(e.target.value);
                        }}
                        />

                        <button type="submit" className="new-post-button">
                            Add New Post
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewPostPopup;