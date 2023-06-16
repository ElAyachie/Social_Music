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
      console.log(result);
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

  app.get('/api/users/info/get', (req, res) => {
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
        if(result.length > 0) {
          if(result[0].UserID == UserID) {
            res.send({
              "userID": result[0].UserID,
              "email": result[0].email,
              "username": result[0].Username,
              "name": result[0].Name,
              "bio": result[0].Bio,
              "code": 200
            });
          }
        }
      }
    });
  });

  app.patch('/api/users/update_info/update', (req, res) => {
    const UserID = req.body.userID;
    const Name = req.body.newName;
    const Bio = req.body.newBio;
    db.query(query.updateUserInfo, [Name, Bio, UserID], (error, result) => {
      console.log(result);
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