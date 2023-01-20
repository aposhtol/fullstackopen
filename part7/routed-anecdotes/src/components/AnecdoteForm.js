import { useField } from '../hooks'

const CreateNew = (props) => {
  const { reset: rc, ...content }  = useField('content')
  const { reset: ra, ...author } = useField('author')
  const { reset: ri, ...info } = useField('info')

  const handleSubmit = event => {
    event.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  const handleReset = () => {
    rc()
    ra()
    ri()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
            content
          <input {...content} />
        </div>
        <div>
            author
          <input {...author} />
        </div>
        <div>
            url for more info
          <input {...info} />
        </div>
        <button type='submit'>create</button>
        <button type='reset' onClick={handleReset}>reset</button>
      </form>

    </div>
  )
}

export default CreateNew