module.exports = (app, db) => {
    const query = require('../query/comments.queries.json');

    app.get('/api/comments/get', (req, res) => {
        const UserID = req.query.UserID;
        db.query(query.getComments, [UserID], (error, result) => {
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
                  "success": "Comments got successfully",
                  "comments": result
                });
            }
        });
    });

    app.get('/api/comments/profile/get', (req, res) => {
        const UserID = req.query.UserID;
        db.query(query.getCommentsForUsersPosts, [UserID], (error, result) => {
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
                  "success": "comments got successfully",
                  "comments": result
                });
            }
        });
    });

    app.get('/api/comments/likes/update', (req, res) => {
        const CommentID = req.query.CommentID;
        db.query(query.addLikeToComment, [CommentID], (error, result) => {
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
                  "success": "comment updated successfully"
                });
            }
        });
    });
  
    app.post('/api/comments/insert', (req, res) => {
        const PostID = req.body.PostID;
        const UserID = req.body.UserID;
        const CommentText = req.body.CommentText;
        db.query(query.addComment, [PostID, UserID, CommentText], (error, result) => {
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
                  "success": "comment added successfully",
                  "comments": result
                });
            }
        });
    });
};