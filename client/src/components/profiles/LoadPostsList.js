import api from '../../config/api';
import axios from 'axios';


// Loads in all the users the user has in the database and displays them on the profile page.
function LoadPostsList() {
    const user = JSON.parse(localStorage.getItem("user"));
    const userID = user.UserID;

    // Using the UserID from the local storage the server queries the database for all the user's friends on the database.
    const getPosts  = async e  =>  {
        await axios.get(api.base_url + '/posts/get', {
                params: {
                    UserID: userID
                }
            })
            .then(function(response) {
                console.log(response);
                if (response.data.code === 200) {
                    let dataObject = {};
                    let postsList = [];
                    console.log(response);
                    for(var i = 0; i < response.data.posts.length; i++) {
                        dataObject = {
                            PostID: response.data.posts[i].PostID,
                            PostText: response.data.posts[i].PostText,
                            FriendID: response.data.posts[i].FriendID,
                            Username: response.data.posts[i].Username,
                            Name: response.data.posts[i].Name,
                            Likes: response.data.posts[i].PostLikes
                        };
                        postsList.push(dataObject);
                    }
                    console.log("posts data recieved");
                    localStorage.setItem("posts", JSON.stringify(postsList));
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    };

    localStorage.setItem("posts", JSON.stringify([]));  
    getPosts();
}

export default LoadPostsList;