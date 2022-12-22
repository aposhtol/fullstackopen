import { useEffect } from 'react'
import Anecdotes from './components/Anecdotes'
import NewAnecdote from './components/NewAnecdote'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])


  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      <Filter/>
      <Anecdotes/>
      <NewAnecdote/>
    </div>
  )
}

export default App