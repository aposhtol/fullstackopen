import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const NewAnecdote = (props) => {

  //const dispatch = useDispatch()

  const addNew = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    //const newAnec = await anecService.newAnecdote(content)
    props.createAnecdote(content)
    props.setNotification(`'${content}' anecdote has been created`)
    setTimeout(() => {
      props.setNotification('')
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNew}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )

}

const mapDispatchToProps = {
  createAnecdote,
  setNotification
}

const ConnectedNewAnecdote = connect(null, mapDispatchToProps)(NewAnecdote)

export default ConnectedNewAnecdote