module.exports = (app, db) => {
  const query = require('../query/user_information.queries.json');

  app.get('/api/users/get', (req, res) => {
    db.query(query.getAllData, (error, result) => {
      if(error) {
        console.log("Error on get", error);
        res.send({
          "code": 400,
          "failed": "error occured"
        });
      }
      else {
        if(result.length > 0) {
            res.send({
              "code": 200,
              "success": "users found",
              "users": result
            });
        }
        else {
          res.send({
            "code": 204,
            "failed": "No users"
          });
        }
      }
    });
  });
  
  app.post('/api/users/insert', (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    db.query(query.addNewUser, [username, email, password, name], (error, result) => {
      if(error) {
        console.log("Error on insert", error);
        res.send({
          "code": 400,
          "failed": "error occured"
        });
      }
      else {
        res.send({
          "code": 200,
          "success": "user registered sucessfully"
        });
      }
    });
  });

  app.get('/api/user/get', (req, res) => {
    const UserID = req.query.UserID;
    db.query(query.getUserInfo, [UserID], (error, result) => {
      if(error) {
        console.log("Error occured", error);
        res.send({
          "code": 400,
          "failed": "Error occured"
        });
      }
      else {
        res.send({
          "code": 200,
          "success": "user got successfully",
          "user": result[0]
        });
      }
    });
  });

  app.patch('/api/users/update_info/update', (req, res) => {
    const UserID = req.body.userID;
    const Name = req.body.newName;
    const Bio = req.body.newBio;
    const ProfileImage = req.body.profileImage;
    db.query(query.updateUserInfo, [UserID, Name, Bio, ProfileImage], (error, result) => {
      if(error) {
        console.log("Error on put", error);
        res.send({
          "code": 400,
          "failed": "error occured"
        });
      }
      else {
        res.send({
          "code": 200,
          "success": "Changes were successful"
        });
      }
    });
  });
};