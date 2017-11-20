var Post = require('../models/post')
var Comment = require('../models/comment')
var User = require('../models/user')

module.exports = function(app) {
    //GET new reply
    app.get('/posts/:postId/comments/:commentId/replies/new', function(req, res, next) {
        Post.findById(req.params.postId).exec(function (err, post) {
            Comment.findById(req.params.commentId).exec(function(err, comment) {
                res.render('replies-new', { post: post, comment: comment })
            })
        })
    })
    //POST(create) reply
    app.post('/posts/:postId/comments/:commentId/replies', function (req, res, next) {
        Post.findById(req.params.postId).exec(function(err, post) {
            var comment = post.comments.id(req.params.commentId)
            console.log(req.body)
            comment.comments.unshift(req.body)
            post.markModified('comments')
            post.save()
            res.redirect('/posts/' + post._id)
        })
    })
}
