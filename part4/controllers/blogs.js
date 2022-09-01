const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
  })
  
blogsRouter.post('/', async (request, response) => {
  const { body, user } = request
  
  const userEntry = await User.findById(user.id)

  const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: userEntry._id
  })

  const savedBlog = await blog.save()
  userEntry.blogs = userEntry.blogs.concat(savedBlog._id)
  await userEntry.save()
      
  response.status(201).json(savedBlog)
})
  
blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (blog) {
    response.json(blog)
  }
  else {
    response.status(404).end
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  //const user = jwt.verify(request.token, process.env.SECRET)

  if(blog.user.toString() === request.user.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }

  else {
    response.status(401).send({
      error: 'unauthorized'
    })
  }
  
})

blogsRouter.put('/:id', async (request, response) => {
  const { likes } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { likes }, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter