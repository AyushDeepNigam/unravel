const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const SolutionSchema = new Schema(
  {
    problemId: { type: Schema.Types.ObjectId, ref: "Data" },
    email_solution: String,
    name: String,
    solution: String,
    date: String,
    thumbnail: String,
    status: String
  },
  { timestamps: true }
);
// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Solution", SolutionSchema);
