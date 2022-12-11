import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'

describe('blog renders tests', () => {
  let blog

  beforeEach(() => {
    blog = {
      title: 'some title',
      author: 'John Doe',
      url: 'http:/something.com',
      likes: 33
    }
  })

  test('component does not render its url or number of likes by default', () => {
    const { container } = render(<Blog blog={blog}/>)
    const def = container.querySelector('#default')

    expect(def).not.toHaveTextContent('http:/something.com')
    expect(def).not.toHaveTextContent(33)
    expect(def).toHaveTextContent('some title')
    expect(def).toHaveTextContent('John Doe')
  })

  test('blog\'s url and number of likes are shown when the button controlling the shown details has been clicked', () => {
    const { container } = render(<Blog blog={blog}/>)
    const view = screen.getByText('view')
    fireEvent.click(view)
    const all = container.querySelector('#all')

    expect(all).toHaveTextContent('http:/something.com')
    expect(all).toHaveTextContent('33')
  })

  test('if the like button is clicked twice, the event handler the component received as props is called twice', () => {
    const mockHandler = jest.fn()

    render(<Blog blog={blog} handleLike={mockHandler}/>)

    const view = screen.getByText('view')
    fireEvent.click(view)

    const button = screen.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)

  })

  it('blog form calls the event handler it received as props with the right details when a new blog is created', () => {
    const mockHandler = jest.fn()

    render(<BlogForm createBlog={mockHandler}/>)

    const title = screen.getByPlaceholderText('...write title')
    const author = screen.getByPlaceholderText('...write author')
    const URL = screen.getByPlaceholderText('...write URL')
    fireEvent.change(title, { target: { value: 'new title' } })
    fireEvent.change(author, { target: { value: 'me' } })
    fireEvent.change(URL, { target: { value: 'my-site' } })

    const button = screen.getByText('create')
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler).toHaveBeenCalledWith({ 'title': 'new title', 'author': 'me', 'url': 'my-site' })
  })
})