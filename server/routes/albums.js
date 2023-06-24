module.exports = (app, db) => {
    const query = require('../query/albums.queries.json');

      app.get('/api/users/album_interests/get', (req, res) => {
        db.query(query.getAllAlbumData, (error, result) => {
        });
      });

      app.get('/api/users/load_albums/get', (req, res) => {
        const UserID = req.query.UserID;
        db.query(query.getAllAlbumInterestsByUserID, [UserID], (error, result) => {
          if(error) {
            console.log("Error on get", error);
            res.send({
              "code": 400,
              "failed": "error occured"
            });
          }
          else {
            if(result.length > 0) {
              if(result[0].UserID == UserID) {
                res.send({
                  "code": 200,
                  "success": "album interest found",
                  "albumInterests": result
                });
              }
            }
            else {
              res.send({
                "code": 204,
                "failed": "User has no album interests"
              });
            }
          }
        });
      });
      
      app.post("/api/users/album_interests/insert", (req, res) => {
        const UserID = req.body.UserID;
        const AlbumID = req.body.AlbumID;
        const AlbumName = req.body.AlbumName;
        const AlbumPic = req.body.AlbumPic;
        const ArtistID = req.body.ArtistID;
        const ArtistName = req.body.ArtistName;
        db.query(query.addNewAlbumInterest, [UserID, AlbumID, AlbumName, AlbumPic, ArtistID, ArtistName], (error, result) => {
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
              "success": "album interest added."
            });
          }
        });
      });

      app.delete("/api/users/album_interests/delete", (req, res) => {
        const UserID = req.body.UserID;
        const AlbumID = req.body.AlbumID;
        db.query(query.deleteAlbumInterestForUser, [UserID, AlbumID], (error, result) => {
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
              "success": "album interest deleted."
            });
          }
        });
      });
};