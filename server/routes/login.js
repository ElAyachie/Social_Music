module.exports = (app, db) => {
    const query = require('../query/user_information.queries.json');
  
app.post('/api/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.query(query.getUser, [email], (error, result) => {
      if(error) {
        console.log("Error occured", error);
        res.send({
          "code": 400,
          "failed": "Error occured"
        });
      }
      else {
        if(result.length > 0) {
          if(result[0].Password == password) {
            res.send({
              "userID": result[0].UserID,
              "email": email,
              "username": result[0].Username,
              "name": result[0].Name,
              "bio": result[0].Bio,
              "code": 200,
              "success": "Login Successful"
            });
          }
          else {
            res.send({
              "code": 204,
              "failed": "Email and Password do not match."
            });
          }
        }
        else {
          res.send({
            "code": 204,
            "failed": "Email does not exist."
          });
        }
      }
    });
  });

}