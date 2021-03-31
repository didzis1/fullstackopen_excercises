const commentRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')

commentRouter.get('/:id/comments', async (request, response) => {
    try {
        const comments = await Comment
            .find({ blog: request.params.id })
        response.json(comments)
    } catch(exception) {
        console.log(exception)
    }
})

commentRouter.post('/:id/comments', async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id)

        const comment = new Comment({
            content: request.body.comment,
            blog: blog._id
        })
        const savedComment = await comment.save()
        console.log(savedComment)
        // Add comment to blog and save the blog
        blog.comments = blog.comments.concat(savedComment)
        await blog.save()
        response.status(201).json(savedComment)

    } catch(exception) {
        console.log(exception)
        next(exception)
    }

})

module.exports = commentRouter