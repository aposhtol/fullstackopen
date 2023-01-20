const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    
    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('blogs are returned as JSON', async () =>
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
)

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('verifiying that the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')

    response.body.map(blog => {
        expect(blog.id).toBeDefined()
    })
})

test('new blog post can be created', async () => {
    const newBlog = {
        title: 'nesto novo',
        author: 'Mad Max',
        url: 'http://http.io/nn',
        likes: 422
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
})

test('if the likes property is missing from the request, it will default to the value 0', async () => {
    const newBlog = {
        title: 'bez lajkova',
        author: 'Ante',
        url: 'http://http.io/nn'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)

    const response = await api.get('/api/blogs')

    const lastBlog = response.body.pop()

    expect(lastBlog.likes).toBe(0)

})

test('if the title and url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request', async () => {
    const badBlog = {
        author: 'unknown',
        likes: -1
    }

    await api
        .post('/api/blogs')
        .send(badBlog)
        .expect(400)
})

test('blog can be deleted', async () => {
    const initialBlogs = await api.get('/api/blogs')
    const blogToDelete = initialBlogs.body[0]
    
    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const modifidedBlogs = await api.get('/api/blogs')
    expect(modifidedBlogs.body).toHaveLength(helper.initialBlogs.length - 1)
})

test('the amount of likes for a blog post can be updated', async () => {
    const initialBlogs = await api.get('/api/blogs')
    const blogToUpdate = initialBlogs.body[0]

    const updatedLikes = { likes: 1000 }

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedLikes)
    
    const updatedBlogs = await api.get('/api/blogs')
    const updatedBlog = updatedBlogs.body[0]

    expect(blogToUpdate.likes).not.toBe(updatedBlog.likes)
})

afterAll(() =>
    mongoose.connection.close()
)