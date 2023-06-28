import { useQuery } from '@apollo/client'
import { ME } from '../queries'
import { ALL_BOOKS } from "../queries"

const Recommendations = (props) => {

const userResult = useQuery(ME)
const booksResult = useQuery(ALL_BOOKS)

if (!props.show || !props.token) {
  return null
}

if (userResult.loading || booksResult.loading) {
  return <div>loading...</div>
}

const favorite = userResult.data.me.favoriteGenre
const allBooks = booksResult.data.allBooks

const books = allBooks.filter(b => b.genres.includes(favorite))

  

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>patterns</b></p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations