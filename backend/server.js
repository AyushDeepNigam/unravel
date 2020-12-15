const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const logger = require("morgan");
const cookieSession = require("cookie-session");
const passport = require("passport");

const commen = require("./models/comment-model");
require("./models/User");
const x = require("./models/data");
require("./models/solution");
const google_keys = require("./config/google_keys");
require("./services/passport");

var cors = require("cors");
const API_PORT = 3001;

const router = express.Router();

// this is our MongoDB database

// connects our back end code with the database
mongoose.connect(google_keys.dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));
const Schema = mongoose.Schema;

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [google_keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Credentials", true);

  next();
});
require("./routes/authroutes")(app);
require("./routes/crudroutes")(app);
// this is our get method
// this method fetches all available data in our database

router.get("/getData", (req, res) => {
  x.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    else {
      res.send(data);
    }
  }).sort({ createdAt: -1 });
});
// router.get("/getData/comments", (req, res) => {
//   commen.find((err, comment) => {
//     if (err) return res.json({ success: false, error: err });
//     // return res.json({ success: true, data: data });
//     else
//       {
//         console.log(comment.value)
//         res.send(comment);}
//   });
// });

// this is our update method
// this method overwrites existing data in our database

// this is our delete method
// this method removes existing data in our database
router.delete("/deleteData", (req, res) => {
  const { id } = req.body;
  x.findOneAndDelete(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database

// router.post("/putData/comments", (req, res) => {
//   // console.log("comment");
//    let comment1 = new commen()

//   const   { comment,postId} = req.body;
//   console.log( comment);
//   // if (!comment) {
//   //   return res.json({
//   //     success: false,
//   //     error: "INVALID INPUTS"
//   //   });
//   // }
//   z
//   comment1.comment=comment
//   comment1.save(err => {
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true });
//   });
// });

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
