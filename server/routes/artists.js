module.exports = (app, db) => {
    const query = require('../query/artists.queries.json');

    app.get('/api/users/artist_interests/get', (req, res) => {
      db.query(query.getAllArtistData, (error, result) => {
      });
      });

      app.get('/api/users/load_artists/get', (req, res) => {
        const UserID = req.query.UserID;
        db.query(query.getAllArtistInterestsByUserID, [UserID], (error, result) => {
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
                  "success": "artist interest found",
                  "artistInterests": result
                });
              }
            }
            else {
              res.send({
                "code": 204,
                "failed": "User has no artist interests"
              });
            }
          }
        });
      });
      
      app.post("/api/users/artist_interests/insert", (req, res) => {
        const UserID = req.body.UserID;
        const ArtistID = req.body.ArtistID;
        const ArtistName = req.body.ArtistName;
        const ArtistPic = req.body.ArtistPic;
        db.query(query.addNewArtistInterest, [UserID, ArtistID, ArtistName, ArtistPic], (error, result) => {
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
              "success": "artist interest added."
            });
          }
        });
      });

      app.delete("/api/users/artist_interests/delete", (req, res) => {
        const UserID = req.body.UserID;
        const ArtistID = req.body.ArtistID;
        db.query(query.deleteArtistInterestForUser, [UserID, ArtistID], (error, result) => {
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
              "success": "artist interest deleted."
            });
          }
        });
      });
    
    app.post("/api/users/artist_interests/insert", (req, res) => {
      const UserID = req.body.UserID;
      const ArtistID = req.body.ArtistID;
      const ArtistName = req.body.ArtistName;
      const ArtistPic = req.body.ArtistPic;
      db.query(query.addNewArtistInterest, [UserID, ArtistID, ArtistName, ArtistPic], (error, result) => {
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
            "success": "artist interest added."
          });
        }
      });
    });
};