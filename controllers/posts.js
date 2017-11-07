var Post = require('../models/post')
var User = require('../models/user')

module.exports = function(app) {

    //POST(create)
    app.post('/posts/new', function (req, res) {
        console.log("Post /post/new");
        //create instance of Post model
        User.findById(req.user._id).exec(function (err, user) {
            const body = req.body;
            body.author = user._id;
            var post = new Post(body);
            //save instance of post model to DB
            post.save(function (err, post) {
                console.log(post)
                return res.redirect('/')
                //return res.redirect('/posts/' + post._id)
            })
        })
    })

    //GET new post form
    app.get('/posts/new', function (req, res) {
        var currentUser = req.user

        res.render('posts-new', { currentUser: currentUser });
    })

    //GET specific post
    // app.get('/posts/:id', function (req, res) {
    //     var currentUser = req.user
    //
    //     //populate add comments
    //     Post.findById(req.params.id)
    //         .populate('author')
    //         .populate('comments.author')
    //         .exec(function (err, post) {
    //         res.render('posts-show', { post: post, currentUser: currentUser })
    //     });
    // })

    app.delete('/posts/:id', function (req, res) {
        Post.findByIdAndRemove(req.params.id, function (err) {
            res.redirect('/')
        })
    })

}
