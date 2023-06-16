module.exports = (app, db) => {
    const query = require('../query/posts.queries.json');

    app.get('/api/posts/get', (req, res) => {
        const UserID = req.query.UserID;
        db.query(query.getPosts, [UserID, UserID], (error, result) => {
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
                  "success": "posts got successfully",
                  "posts": result
                });
            }
        });
    });

    app.get('/api/posts/likes/update', (req, res) => {
        const PostID = req.body.PostID;
        db.query(query.addLikeToPost, [PostID], (error, result) => {
            console.log(result);
            if(error) {
                console.log("Error on update", error);
                res.send({
                  "code": 400,
                  "failed": "error occured"
                });
            }
            else {
                res.send({
                  "code": 200,
                  "success": "posts updated successfully"
                });
            }
        });
    });
  
    app.post('/api/posts/insert', (req, res) => {
        const PostText = req.body.postText;
        const UserID = req.body.postUserID;

        db.query(query.addPost, [PostText, UserID], (error, result) => {
            //console.log(result);
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
                  "success": "post added successfully"
                });
            }
        });
    });
};