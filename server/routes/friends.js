module.exports = (app, db) => {
    const query = require('../query/friends.queries.json');
    
    app.get('/api/users/friends/get', (req, res) => {
      const UserID = req.query.UserID;
      db.query(query.getAllFriends, [UserID], (error, result) => {
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
                "success": "friends found",
                "friends": result
              });
            }
          else {
            res.send({
              "code": 204,
              "failed": "User has no friends",
            });
          }
        }
      });
    });

    app.post('/api/users/friends/insert', (req, res) => {
      const UserID = req.body.UserID;
      const FriendID = req.body.FriendID;
      db.query(query.addNewFriend, [UserID, FriendID], (error, result) => {
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
            "success": "Friend added sucessfully"
          });
        }
      });
    });

    app.delete("/api/users/friends/delete", (req, res) => {
        const UserID = req.body.UserID;
        const FriendID = req.body.FriendID;
        db.query(query.deleteFriend, [UserID, FriendID], (error, result) => {
          if(error) {
            console.log("Error on delete", error);
            res.send({
              "code": 400,
              "failed": "error occured"
            });
          }
          else {
            res.send({
              "code": 200,
              "success": "friend deleted."
            });
          }
        });
      });

};