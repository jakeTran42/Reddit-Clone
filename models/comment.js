var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var CommentSchema = new Schema({
    content: { type: String, required: true },
    comments: [ this ],
    author: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true }
})


module.exports = mongoose.model('Comment', CommentSchema)
