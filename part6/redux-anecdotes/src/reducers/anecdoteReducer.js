import { createSlice } from '@reduxjs/toolkit'
import anecService from '../services/anecdotes'

/*const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)*/

const anecdoteReducer = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    /*createAnecdote(state, action) {
      state.push(action.payload)
    },*/

    vote(state, action) {
      const id = action.payload.id
      /*const  [ anToChange ]  = state.filter(an => an.id === id)

      const changedAn = {
        ...anToChange,
        votes: anToChange.votes + 1
      }*/

      return state.map(an => an.id !== id ? an : action.payload)
    },

    setAnecdotes(state, action) {
      return action.payload
    },

    appendBlog(state, action) {
      state.push(action.payload)
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const anecdotes = await anecService.newAnecdote(content)
    dispatch(appendBlog(anecdotes))
  }
}

export const voted = id => {
  return async (dispatch, getState) => {
    const state = getState()

    const [ blog ] = state.anecdotes.filter(an => an.id === id)
    const newObject = { ...blog, votes: blog.votes + 1 }
    const response = await anecService.updateAnecdote(id, newObject)
    dispatch(vote(response))
  }
}

export const selectAnecdote = state => [...state.anecdotes]
export const { appendBlog, vote, setAnecdotes } = anecdoteReducer.actions

export default anecdoteReducer.reducer