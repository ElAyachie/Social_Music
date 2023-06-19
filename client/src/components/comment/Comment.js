import React, { useState } from 'react';
import './comment.scss';
import favoriteIcon from '../../assets/note.png';
import getImageByKey from '../profiles/getImageByKey';
import axios from 'axios';
import api from '../../config/api';

// Design for each idividual Comment.
function Comment(props) {
    const [comment, setComment] = useState(props.comment);

    const handleCommentLike = async e =>  {
        await axios.get(api.base_url + "/comments/likes/update", {
                params: {
                    CommentID: comment.CommentID
                }
            })
            .then(function(response) {
                setComment({ ...comment, CommentLikes: comment.CommentLikes + 1 })
            })
            .catch(function(error) {
                console.log(error);
            });
        };

    return (
        <div className="comment" id={comment.key}>
            <div className="userInfo">
                <img src={getImageByKey(comment.Username)} alt="User Profile" className="profileImg" />
                <br />
                <h4 className="user">{"@" + comment.Username}</h4>
            </div>
            <br />
            <div className="commentDataBox">
                <p className="commentData">
                    {comment.CommentText}
                </p>
            </div>
            <br />
            <div className="icons">
                <div className="like-button-area">
                    <button className='like-button' data-commentid={comment.CommentID} onClick={handleCommentLike} >
                        <img src={favoriteIcon} alt="Favorite icon" data-commentid={comment.CommentID} className="icon like-button"/>
                    </button>
                    <p className="icon like-button">{comment.CommentLikes}</p>
                </div>
            </div>
        </div>
    );
}


export default Comment;