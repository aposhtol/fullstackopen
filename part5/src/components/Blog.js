import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [showAll, setShowAll] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (showAll) {
    return (
      <div style={blogStyle} id='all'>
        {blog.title}
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? 'hide' : 'view'}
        </button>
        <br/>{blog.url}<br/>likes {blog.likes}
        <button onClick={handleLike}>like</button>
        <br/>{blog.author}
        <br/>
        <button onClick={handleDelete}>remove</button>
      </div>
    )
  }

  return (
    <div style={blogStyle} id='default' className='blog'>
      {blog.title} {blog.author}
      <button onClick={() => setShowAll(!showAll)}>
        {showAll ? 'hide' : 'view'}
      </button>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.array.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default Blog