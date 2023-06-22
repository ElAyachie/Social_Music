const express = require('express');
const cors = require('cors');
const config = require('./config/db.config');
const mysql = require('mysql');


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable('x-powered-by');

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.get("/", (req, res) => {
  res.json({ message: "Server is up." });
});

app.get('/status', (req, res) => res.send('Working!'));

const db = mysql.createPool({
  host: config.HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DB
});

require("./routes/users")(app, db);
require("./routes/login")(app, db);
require("./routes/posts")(app, db);
require("./routes/comments")(app, db);
require("./routes/artists")(app, db);
require("./routes/albums")(app, db);
require("./routes/songs")(app, db);
require("./routes/friends")(app, db);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API Server is running on port ${PORT}.`);
});

module.exports = app;

/*db.connect(function(err) {
  if (err) throw err;
  console.log("Connected to GCP Database!");
});*/