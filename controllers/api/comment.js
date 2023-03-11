const Comment = require('../../models/comment')
const post = require('../../models/post')
const Post = require('../../models/post')
const Thread = require('../../models/thread')


function createComment(req, res, next){
    const comment = req.body
    comment.owner = req.user._id
    const threadId = req.body.threadId
    // const postId = req.body.postId
    const postObj = {}
    Thread.findOne({_id: threadId})
    .then((thread) => {
        for(let i = 0; i < thread.posts.length; i++){
            thread.posts[i].comments.push(comment)
            const postIndex = thread.posts[i].comments
            postObj[post._id] = postIndex   
        }
        return thread.save()
    })
    .then((post) => {
        res.status(201).json({post: post})
        
    })
     .catch(next)
}


function deleteComment(req, res, next){
    Post.findById(req.params.id)
    .then((comment) => {
        comment.id(req.body.id).remove()
        return comment.save()
    })
    .then(() => res.Status(204))
    .catch(next)
}







// function indexComment (req, res, next){
//     Post.find({})
//         .populate('owner')
//         .then((comments) => {
//             return comments.map((comments) => comments)
//         })
//         .then((comments) => {
//             return res.status(200).json({ comments: comments })
//         })
//         .catch(next)
// }

// function showComment(req, res, next){
//     Post.findById(req.params.id)
//     .then((comment) => res.status(200).json({comment: comment}))
//     .catch(next)
// }

// function updateComment(req, res, next) {
//     Post.findById(req.params.id)
//     .then((comment) => {
//         const comment = comment.id(req.body.id)
//         comment.topic = req.body.text
//         return comment.save()
//     })
//     .then((comment) => res.status(204).json(comment))
//     .catch(next)
// }


module.exports = {
    createComment,
    // indexComment,
    // showComment,
    // updateComment,
    deleteComment
}