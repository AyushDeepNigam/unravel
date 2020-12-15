//this is the user information
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const userSchema = new Schema({
  googleId: String,

  name: {
    type: String
  },
  thumbnail: {
    type: String
  },
  email: {
    type: String
  }
});
mongoose.model("users", userSchema);
