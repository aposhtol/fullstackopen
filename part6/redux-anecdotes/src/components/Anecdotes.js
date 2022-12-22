import { useDispatch, useSelector } from 'react-redux'
import { voted, selectAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdotes = () => {

  const anecdotes = useSelector(selectAnecdote)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()



  const vote = (anecdote) => {

    dispatch(voted(anecdote.id))
    dispatch(setNotification(`You voted '${anecdote.content}'`, 5000))
    /*setTimeout(() => {
      dispatch(clearMessage(''))
    }, 5000)*/
  }

  const anToShow = anecdotes.filter(an => an.content.toLowerCase().indexOf(filter.toLowerCase()) >= 0)

  return (
    <div>
      {anToShow.sort((a,b) => a.votes > b.votes ? -1 : 0).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Anecdotes