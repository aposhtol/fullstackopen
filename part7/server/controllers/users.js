const usersRouter = require('express').Router()
const User = require('../models/user')
const bcryptjs = require('bcryptjs')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
    response.status(200).send(users)
})

usersRouter.post('/', async (request,response) => {
    const { username, name, password } = request.body

    if (!username || !password) {
        return response.status(400).send({
            error: "Username and password required."
        })
    }

    if (username.length < 3 || password.length < 3) {
        return response.status(400).json({
            error: 'Username or password shorter than 3 characters.'
        })
    }

    const existingUser = await User.findOne({ username })
  
   if (existingUser) {
        return response.status(400).json({
            error: 'This username is already taken. Please change your username.'
            })
    }

    const passwordHash = await bcryptjs.hash(password, 10)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()

    response.status(201).send(savedUser)
    
})

module.exports = usersRouter