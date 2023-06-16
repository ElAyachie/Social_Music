module.exports = (app, db) => {
    const query = require('../query/comments.queries.json');

    app.get('/api/comments/get', (req, res) => {
        const UserID = req.query.UserID;
        db.query(query.getComments, [UserID], (error, result) => {
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
                  "success": "Comments got successfully",
                  "comments": result
                });
            }
        });
    });
  
    app.post('/api/comments/insert', (req, res) => {
        const PostID = req.body.postID;
        const Comment = req.body.comment;
        const UserID = 4;
        db.query(query.addComment, [PostID, Comment, UserID], (error, result) => {
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
                  "success": "comment added successfully"
                });
            }
        });
    });
};