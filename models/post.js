var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Comment = require('./comment')

var PostSchema = new Schema({
    createdAt: { type: Date },
    updatedAt: { type: Date },

    title: { type: String, required: true },
    body: { type: String, required: false },
    url: { type: String, required: false },
    subreddit: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    comments: [ Comment.schema ]

})

// PostSchema.pre('save', function(next) {
//     var now = new Date()
//     this.updatedAt = now
//     if ( !this.createdAt ) {
//         this.createdAt = now
//     }
//     next()
// })

module.exports = mongoose.model('Post', PostSchema)
