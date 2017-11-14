var chai = require('chai')
var chaiHttp = require('chai-http')
var should = chai.should()
var Post = require('../models/post')
var User = require('../models/user')
var mongoose = require('mongoose')
var expect = chai.expect;


// var agent = chai.request.agent(server)

chai.use(chaiHttp)
mongoose.Promise = global.Promise

it('Should return an array of posts', (done) => {
    Post.find({}).then((posts) => {       // Searches for all Posts
        expect(posts).to.be.an('array');  // Expects posts to be an array
        done();                           // Calls done on a success
    }).catch((err) => {
        done(err);                        // Or call done with an error.
    });
});

// should create a new user
// should check that user is in database

it('Should create a new user', (done) => {
    testUser = new User ({ username: "testUser",
                           password: "testPassword" })
    User.create(testUser).then((user) => {
        expect(user).to.have.property('_id');
        expect(user).to.have.property('username').to.equal('testUser')
        done();
    }).catch((err) => {
        done(err);
    });
});

it('Should add a new post', (done) => {
    User.findOne({ username: 'testUser' }).then((user) => {
        var testPost = new Post({ title: "Testxyz",
                              body: "This is a test",
                              url: "https://www.test.com/",
                              subreddit: "Testing",
                              author: user._id })
        return testPost
    }).then((testPost) => {
        return testPost.save()
    }).then((post) => {
        expect(post).to.have.property('_id');
        done();
    }).catch((err) => {
        done(err);
    });
});

it('Should fetch a post with properties', (done) => {
    Post.findOne({ title: 'Testxyz' }).then((post) => {
        expect(post).to.have.property('body').to.equal("This is a test");
        expect(post).to.have.property('url').to.equal("https://www.test.com/");
        expect(post).to.have.property('subreddit').to.equal("Testing");
        expect(post).to.have.property('author');
        return post._id;
    }).then((postId) => {
        Post.findByIdAndRemove(postId, function (err) {
            return err
        });
        done();
    }).catch((err) => {
        done(err);
    });
});

// should get id of new user
// should find user by that id to see it exists

it('Should find a user with an id', (done) => {
    User.findOne({ username: 'testUser' }).then((user) => {
        expect(user).to.have.property('username').to.equal("testUser");
        return user._id
    }).then((userId) => {
        User.findById(userId, function (err) {
            return err
        })
        done();
    }).catch((err) => {
        done(err);
    });
});

// should get user that was created
// should check that all user properties are valid


it('Should remove a user', (done) => {

    User.find({}).then((users) => {
        expect(users).to.be.an('array');
        return User.findOneAndRemove({ username: 'testUser' }, function (err) { return err })
    }).then((user) => {
        expect(user).to.have.property('username').to.equal("testUser");
        if (User.findById(user._id) === null) {
            return 'null'
        }
    }).then((user) => {
        expect(user).to.equal(undefined);
        done();
    }).catch((err) => {
        done(err);
    });
});
