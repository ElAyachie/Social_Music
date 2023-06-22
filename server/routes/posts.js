module.exports = (app, db) => {
    const query = require('../query/posts.queries.json');

    app.get('/api/posts/get', (req, res) => {
        const UserID = req.query.UserID;
        db.query(query.getPosts, [UserID], (error, result) => {
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

    app.get('/api/posts/profile/get', (req, res) => {
        const UserID = req.query.UserID;
        db.query(query.getUserPosts, [UserID], (error, result) => {
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
        const PostID = req.query.PostID;
        db.query(query.addLikeToPost, [PostID], (error, result) => {
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
        const UserID = req.body.UserID;
        const PostText = req.body.PostText;
        db.query(query.addPost, [UserID, PostText], (error, result) => {
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
                  "success": "post added successfully",
                  "posts": result
                });
            }
        });
    });
};