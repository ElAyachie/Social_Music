import api from '../../config/api';
import axios from 'axios';
import getImage from '../../components/profiles/getImage';

// Loads in all friends the user has in the database and displays them on the profile page.
function LoadFriendsList() {
    const user = JSON.parse(localStorage.getItem("user"));
    const userID = user.UserID;

    // Using the UserID from the local storage the server queries the database for all the user's friends on the database.
    const getFriends  = async e  =>  {
        await axios.get(api.base_url + '/users/friends/get', {
                params: {
                    UserID: userID
                }
            })
            .then(function(response) {
                if (response.data.code === 200) {
                    let dataObject = {};
                    let friendsList = [];
                    for(var i = 0; i < response.data.friends.length; i++) {
                        dataObject = {
                            FriendID: response.data.friends[i].FriendID,
                            Username: response.data.friends[i].Username,
                            Name: response.data.friends[i].Name,
                            ProfileImage: getImage(response.data.friends[i].ProfileImage)
                        };
                        friendsList.push(dataObject);
                    }
                    localStorage.setItem("friends", JSON.stringify(friendsList));
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    };

    localStorage.setItem("friends", JSON.stringify([]));
    getFriends();   
}

export default LoadFriendsList;