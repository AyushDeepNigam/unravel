var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var ObjectId = Schema.ObjectId;
var commentSchema = new Schema({
comment :String,    
postId :String
});

module.exports = mongoose.model('commentSchema', commentSchema);