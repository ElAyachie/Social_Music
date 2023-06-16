import React from 'react';
import PropTypes from 'prop-types';
import './feed1.scss';

import profileImg from '../../assets/blankUser.jpg';
import favorite from '../../assets/note.png';
import comment from '../../assets/comment.png';

// Design for each idividual post.
function Post(props) {

    const handleComment = async e => {
        
    }

    return(
        <div className="post">
            <div className="userInfo">
                <img src={profileImg} alt="User Profile" className="profileImg" />
                <br />
                <h4 className="user">{props.userName}</h4>
            </div>
            <br />
            <p className="postData">
                {props.postText}
            </p>
            <br />
            <div className="icons">
                <img src={favorite} alt="Favorite icon" className="icon" />
                <button onClick={handleComment}>
                    <img src={comment} alt="Comment icon" className="icon"/>
                </button>
            </div>
        </div>
    );
}

Post.propTypes = {
    userName: PropTypes.string,
    postText: PropTypes.string
}

export default Post;