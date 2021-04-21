import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, BOOKS_BY_GENRE } from '../queries'

const Books = (props) => {
  const { loading, data } = useQuery(ALL_BOOKS)
  const [filter, setFilter] = useState(null)
  const [filterBooks, result ] = useLazyQuery(
    BOOKS_BY_GENRE, { 
      fetchPolicy: 'cache-and-network',
      variables: { genre: filter } 
    }
  )

  useEffect(() => {
    if (filter) {
      filterBooks()
    }
  }, [ filter ]) // eslint-disable-line

  if (result.called && result.loading) return 'loading filters...'

  if (!props.show) {
    return null
  }

  if (loading) return 'Loading...'

  const allGenres = []
  data.allBooks.forEach(book => {
    book.genres.forEach(genre => {
      if(!allGenres.includes(genre)) {
        allGenres.push(genre)
      }
    })
  })
  allGenres.push('all genres')

  const handleGenre = async (genre) => {
    if (genre === 'all genres') {
      setFilter(null)
    } else {
      setFilter(genre)
    }
  }

  // console.log(result.data)

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {
            result.data ?
              result.data.allBooks.map(b =>
                <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            ) :
              data.allBooks.map(a =>
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
            )
          }
        </tbody>
      </table>
      {
        allGenres.map(genre => {
          return (
            <button key={genre} onClick={() => handleGenre(genre)}>{genre}</button>
          )
        })
      }
    </div>
  )
}

export default Books