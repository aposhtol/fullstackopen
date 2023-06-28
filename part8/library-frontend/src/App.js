import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/Login'
import Recommendations from './components/Recommend'
import {useApolloClient, useSubscription, useQuery} from '@apollo/client'
import { BOOK_ADDED, ALL_BOOKS } from './queries'

export const updateCache = (cache, query, addedBook) => {
  
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const [genre, setGenre] = useState(null)
  const { loading, data, refetch } = useQuery(ALL_BOOKS, { variables: { genre: genre } })
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      alert(`Book with a title "${data.data.bookAdded.title}" was added to library`)

      updateCache(client.cache, { query: ALL_BOOKS }, data.data.bookAdded)
      refetch()
    }
  })

  if (loading) {
    return <div>loading...</div>
  }

  const allBooks = data.allBooks

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {!token && <button onClick={() => setPage('login')}>Login</button>}
        {token && <button onClick={() => setPage('recommend')}>recommend</button>}
        {token && <button onClick={logout}>Logout</button>}
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} allBooks={allBooks} setGenre={setGenre}/>

       <NewBook show={page === 'add'} />

       <LoginForm show={page === 'login'} setToken={setToken} />

       <Recommendations show={page === 'recommend'} token={token}/>
    </div>
  )
}

export default App
