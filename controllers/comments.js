var Comment = require('../models/comment')
var Post = require('../models/post')

module.exports = function(app) {

    //POST(create) new comment
    app.post('/posts/:postId/comments', function (req, res) {
        const body = req.body;
        body.author = req.user._id;
        body.postId = req.params.postId
        //new instance of comment model
        var comment = new Comment(body)
        // var comment = req.body;

        Post.findById(req.params.postId)
        //.populate('comments.author')
        .exec(function (err, post) {
            console.log(req.params)
            //save instance to DB
            comment.save(function (err, comment) {
                console.log(post)
                post.comments.unshift(comment);
                post.save()

                console.log(comment)
                return res.redirect('/posts/' + post._id)
            })
        })
    })
}