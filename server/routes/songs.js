module.exports = (app, db) => {
    const query = require('../query/songs.queries.json');

    app.get('/api/users/song_interests/get', (req, res) => {
        db.query(query.getAllSongData, (error, result) => {
          console.log(result);
        });
      });

      app.get('/api/users/load_songs/get', (req, res) => {
        const UserID = req.query.UserID;
        db.query(query.getAllSongInterestsByUserID, [UserID], (error, result) => {
          //console.log(result);
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
                  "success": "song interest found",
                  "songInterests": result
                });
              }
            }
            else {
              res.send({
                "code": 204,
                "failed": "User has no song interests"
              });
            }
          }
        });
      });
      
      app.post("/api/users/song_interests/insert", (req, res) => {
        const UserID = req.body.UserID;
        const SongName = req.body.SongName;
        const SongLink = req.body.SongLink;
        const ArtistID = req.body.ArtistID;
        const ArtistName = req.body.ArtistName;
        const AlbumID = req.body.AlbumID;
        const AlbumPic = req.body.AlbumPic;
        db.query(query.addNewSongInterest, [UserID, SongName, SongLink, ArtistID, ArtistName, AlbumID, AlbumPic], (error, result) => {
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
              "success": "song interest added."
            });
          }
        });
      });

      app.delete("/api/users/song_interests/delete", (req, res) => {
        const UserID = req.body.UserID;
        const SongName = req.body.SongName;
        db.query(query.deleteSongInterestForUser, [UserID, SongName], (error, result) => {
          console.log(result);
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
              "success": "song interest deleted."
            });
          }
        });
      });
};