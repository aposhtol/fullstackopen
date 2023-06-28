import { useState } from "react"
import Select from 'react-select'
import { useQuery, useMutation } from "@apollo/client"
import { ALL_AUTHORS, EDIT_BIRTH } from "../queries"

const Authors = (props) => {
  //const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [selected, setSelected] = useState(null)
  const authorsResult = useQuery(ALL_AUTHORS)
  const [ birthYear ] = useMutation(EDIT_BIRTH)

  if (authorsResult.loading) {
    return <div>loading...</div>
  }

const authors = authorsResult.data.allAuthors

  const options = []
  authors.forEach(a => 
    options.push({value: a.name, label: a.name})
  )

  if (!props.show) {
    return null
  }

const submit = (event) => {
  event.preventDefault()

  birthYear({variables: {name: selected.value, born: parseInt(born, 10)}})

  //setName('')
  setBorn('')
}

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <Select defaultValue={selected} onChange={setSelected} options={options} />

        {/*<div>
          name
          <input value={name} onChange={({target}) => setName(target.value)} />
          </div>*/}
        <div>
          born
          <input value={born} type='number' onChange={({target}) => setBorn(target.value)} />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
