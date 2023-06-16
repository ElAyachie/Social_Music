import React from 'react';
import PropTypes from 'prop-types';
import './feed.scss';

import profileImg from '../../assets/blankUser.jpg';
import favorite from '../../assets/note.png';
import comment from '../../assets/comment.png';

// Design for each idividual comment.
function Comment(props) {

    const handleComment = async e => {
        
    }

    return(
        <div className="comment">
            <div className="userInfo">
                <img src={profileImg} alt="User Profile" className="profileImg" />
                <br />
                <h4 className="user">{props.userName}</h4>
            </div>
            <br />
            <div className="commentDataBox">
                    <p className="commentData">
                        {props.commentText}
                    </p>
                </div>
            <br />
            <div className="icons">
                <img src={favorite} alt="Favorite icon" className="icon" />
                <button onClick={handleComment} className="commentBtn">
                    <img src={comment} alt="Comment icon" className="icon"/>
                </button>
            </div>
        </div>
    );
}

Comment.propTypes = {
    userName: PropTypes.string,
    commentText: PropTypes.string
}

export default Comment;