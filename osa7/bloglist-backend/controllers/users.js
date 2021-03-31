const User = require('../models/user')
const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')

// GET
usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        .populate('blogs', { url:1, title: 1, author: 1 })
    response.json(users)
})


// POST
usersRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body

        if (!body.password || body.password.length < 3) {
            // 401 = unauthorized
            return response.status(401).json({ error: 'password is too short or missing' })
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash
        })

        const savedUser = await user.save()

        response.json(savedUser)
    } catch (exception) {
        next(exception)
    }


})



module.exports = usersRouter

