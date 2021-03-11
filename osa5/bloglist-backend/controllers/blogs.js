const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogRouter.post('/', async (request, response, next) => {
    try {
        // console.log(request.token)
        const body = request.body
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'token is missing or invalid' })
        }

        const user = await User.findById(decodedToken.id)

        const blog = new Blog(body)

        if (!blog.likes) {
            blog.likes = 0
        }

        if (!blog.title && !blog.url) {
            response.status(400).end()
        }

        blog.user = {
            _id: user._id,
            username: user.username,
            name: user.name
        }
        const savedNote = await blog.save()
        user.blogs = user.blogs.concat(savedNote._id)
        await user.save()

        await savedNote.populate('user').execPopulate()

        //  savedNote.user = {
        //     _id: user._id,
        //     username: user.usernamez,
        //     name: user.name
        // }
        console.log('Saved Note:', savedNote)
        response.status(201).json(savedNote)
    } catch (exception) {
        next(exception)
    }
})

blogRouter.delete('/:id', async (request, response, next) => {
    try {
        const blogID = request.params.id
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        const blogToDelete = await Blog.findById(blogID)
        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'token is missing or invalid' })
        }
        if (blogToDelete.user.toString() === decodedToken.id) {
            await Blog.findByIdAndRemove(blogID)
            return response.status(204).end()
        } else {
            return response.status(401).json({ error: 'unauthorized access' })
        }
    } catch (exception) {
        next(exception)
    }

})

blogRouter.put('/:id', async (request, response, next) => {
    const body = request.body
    const id = request.params.id
    const existingBlog = await Blog.findById(id)

    // Päivitetään vain requestilta tulleita parametreja
    const blog = {
        title: body.title || existingBlog.title,
        author: body.author || existingBlog.author,
        url: body.url || existingBlog.url,
        likes: body.likes || existingBlog.likes
    }

    try {
        const blogs = await Blog.findByIdAndUpdate(id, blog, { new: true })
        response.json(blogs.toJSON())
    } catch (exception) {
        next(exception)
    }

})

module.exports = blogRouter