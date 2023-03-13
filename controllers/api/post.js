const Thread = require('../../models/thread')
const User = require('../../models/user')
const Comment = require('../../models/comment')

function createPost(req, res, next) {

    const post = req.body
    console.log(post)
    post.owner = req.user._id
    const threadId = req.body.threadId
    Thread.findById(threadId)
        .then((thread) => {
            console.log(thread)
            thread.posts.push(post)
            return thread.save()
        })
        .then((thread) => {
            res.status(201).json({ thread: thread })
        })
        .catch(next)
}



function showPost(req, res, next) {
    const postId = req.params.id
    Thread.findOne({ 'thread.posts._id': postId })
        .then((thread) => {
            const postIndex = thread.posts.findIndex(post => post._id == postId)
            const post = thread.posts[postIndex]
            return post
        })
        .then((post) => {
            return res.status(200).json({ post: post })
        })
        .catch(next)
}



function deletePost(req, res, next) {
    Thread.findById(req.params.id)
        .then((post) => {
            if (post.owner.equals(req.user._id)) {
                return post.deleteOne()
            } else {
                res.sendStatus(401)
            }
        })
        .then(() => res.sendStatus(204))
        .catch(next)
}

module.exports = {
    createPost,
    showPost,
    deletePost
}