import api from '../../config/api';
import axios from 'axios';


// Loads in all the users the user has in the database and displays them on the profile page.
function LoadUsersList() {

    // Using the UserID from the local storage the server queries the database for all the user's friends on the database.
    const getUsers  = async e  =>  {
        await axios.get(api.base_url + '/users/get')
            .then(function(response) {
                if (response.data.code === 200) {
                    let dataObject = {};
                    let usersList = [];
                    for(var i = 0; i < response.data.users.length; i++) {
                        dataObject = {
                            UserID: response.data.users[i].UserID,
                            Username: response.data.users[i].Username,
                            Name: response.data.users[i].Name
                        };
                        usersList.push(dataObject);
                    }
                    console.log("User data recieved");
                    localStorage.setItem("users", JSON.stringify(usersList));
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    };

    localStorage.setItem("users", JSON.stringify([]));  
    getUsers();
}

export default LoadUsersList;