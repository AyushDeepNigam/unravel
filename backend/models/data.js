// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;
// this will be our data base's data structure
const DataSchema = new Schema(
  {
    solution: [{ type: Schema.Types.ObjectId, ref: "Solution" }],

    email: String,
    title: String,
    name: String,
    genre: String,
    description: String,
    date: String,
    thumbnail: String
  },
  { timestamps: true }
);
// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Data", DataSchema);
