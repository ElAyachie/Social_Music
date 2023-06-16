import api from '../../config/api';
import axios from 'axios';


// Loads in all the users the user has in the database and displays them on the profile page.
function LoadCommentsList() {
    const user = JSON.parse(localStorage.getItem("user"));
    const userID = user.UserID;
    // Using the UserID from the local storage the server queries the database for all the user's friends on the database.
    const getComments  = async e  =>  {
        await axios.get(api.base_url + '/comments/get', {
            params: {
                UserID: userID
                }
            })
            .then(function(response) {
                if (response.data.code === 200) {
                    let dataObject = {};
                    let commentsList = [];
                    for(var i = 0; i < response.data.comments.length; i++) {
                        dataObject = {
                            CommentID: response.data.comments[i].CommentID,
                            PostID: response.data.comments[i].PostID,
                            CommentText: response.data.comments[i].CommentText,
                            UserID: response.data.comments[i].UserID,
                            Username: response.data.comments[i].Username,
                            Name: response.data.comments[i].Name,
                            CommentLikes: response.data.comments[i].CommentLikes
                        };
                        commentsList.push(dataObject);
                    }
                    console.log("comments data recieved");
                    localStorage.setItem("comments", JSON.stringify(commentsList));
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    };

    localStorage.setItem("comments", JSON.stringify([]));  
    getComments();
}

export default LoadCommentsList;