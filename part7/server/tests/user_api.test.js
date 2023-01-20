const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'mikki', name: 'Mihael', passwordHash })

    await user.save()
})

test('invalid users cannot be created', async () => {
    const invalid = {
        name: 'Dusko',
        username: "a",
        password: 'password'
    }

    const before = await api.get('/api/users')

    const newUser = await api
        .post('/api/users')
        .send(invalid)
        .expect(400)
        .expect({"error":"Username or password shorter than 3 characters."})
})

afterAll(() =>
    mongoose.connection.close()
)