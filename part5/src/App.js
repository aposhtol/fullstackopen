import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async userObj => {

    try {
      const user = await loginService.login(userObj)

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
    }

    catch (err) {
      setError(err.response.data.error)
    }

    setTimeout(() => {
      setError(null)
    }, 5000)

  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    blogService.setToken(null)
  }

  const addBlog = async newObject => {

    try {
      const response = await blogService.create(newObject)
      setBlogs(blogs.concat(response))
      setMessage(`a new blog ${newObject.title} by ${newObject.author} added`)
    }
    catch (error) {
      setError(error.response.data.error)
    }

    setTimeout(() => {
      setMessage(null)
      setError(null)
    }, 5000)
  }

  const handleLikeOf = async id => {
    const blog = blogs.find(b => b.id === id)
    let updatedLike = blog.likes + 1
    const updatedBlog = { ...blog, likes: updatedLike }

    try {
      const response = await blogService.update(id, updatedBlog)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : response))

    }
    catch (error) {
      setError(error.response.data.error)
    }

    setTimeout(() => {
      setMessage(null)
      setError(null)
    }, 5000)
  }

  const handleDeleteOf = async (id, name) => {
    if(window.confirm(`Delete ${name}?`)) {
      try {
        await blogService.remove(id)
        setBlogs(blogs.filter(b => b.id !== id))
      }

      catch (error) {
        setError(error.response.data.error)
      }

      setTimeout(() => {
        setMessage(null)
        setError(null)
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification message={message} error={error} />

        <LoginForm logUser={handleLogin} />

      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} error={error} />

      <p>{user.name} logged-in</p>
      <button onClick={handleLogout}>logout</button>

      <Togglable buttonLabel='new blog'>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      <div>
        {blogs.sort((a,b) => a.likes > b.likes ? -1 : 0).map(blog =>
          <Blog key={blog.id} blog={blog} handleLike={() => handleLikeOf(blog.id)} handleDelete={() => handleDeleteOf(blog.id, blog.title)}/>
        )}
      </div>
    </div>
  )
}

export default App
