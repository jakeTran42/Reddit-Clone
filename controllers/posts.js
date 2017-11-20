var Post = require('../models/post')
var User = require('../models/user')

module.exports = function(app) {
    //upvote
    app.put('/posts/:id/vote-up', function(req, res) {

        console.log("**** post/:id/vote-up", req.params.id);

        Post.findById(req.params.id).exec(function (err, post) {
            console.log("up votes", post.upVotes);
            post.upVotes.push(req.user._id)
            post.voteScore = post.voteTotal + 1
            post.save().then((post) => {
                console.log("up votes", post.upVotes);
                res.status(200);
            }).catch((err) => {
                console.log(err);
            });

        })
    })

    //downvote
    app.put('/posts/:id/vote-down', function(req, res) {
        Post.findById(req.params.id).exec(function (err, post) {
            post.downVotes.push(req.user._id)
            post.voteScore = post.voteTotal - 1
            post.save()

            res.status(200)
        })
    })

    //POST(create) new post
    // / posts/
    app.post('/posts/new', function (req, res) {
        console.log("Post /post/new");
        //create instance of Post model
        User.findById(req.user._id).exec(function (err, user) {
            // const new Post({
            //     title: req.body.title,
            //     body: req.body.body,
            //     url: { type: String, required: true },
            //     subreddit: { type: String, required: true },
            //     author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
            // })

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
    app.get('/posts/:id', function (req, res) {
        var currentUser = req.user

        //populate add comments
        Post.findById(req.params.id)
            .populate('author')
            .populate('comments.author')
            .exec(function (err, post) {
            res.render('posts-show', { post: post, currentUser: currentUser })
            //mark modified, add postid to comment
        });

    })

    app.delete('/posts/:id', function (req, res) {
        Post.findByIdAndRemove(req.params.id, function (err) {
            res.redirect('/')
        })
    })

}