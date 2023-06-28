//import { useState, useEffect } from "react"
import uuid from 'react-uuid'

const Books = (props) => {
const allBooks = props.allBooks
//const [books, setBooks] = useState([])

//useEffect(() => setBooks(allBooks),[allBooks])

//const [genres, setGenres] = useState([])
const genres = ['ALL']


  allBooks.forEach(b => {
    b.genres.forEach(g => 
      genres.includes(g) ? null : genres.push(g)
    )
  })







const handleClick = ({target}) => {
  //setBooks(target.value === 'ALL' ? allBooks : allBooks.filter(b => b.genres.includes(target.value)))
  target.value === 'ALL' ? props.setGenre(null) : props.setGenre(target.value)
  //return props.setGenre(null)
}

if (!props.show) {
  return null
}

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map(g => <button key={uuid()} onClick={handleClick} value={g}>{g}</button>)}
    </div>
  )
}

export default Books