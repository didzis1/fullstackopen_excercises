import React, { useState } from 'react'
import { ALL_AUTHORS } from '../queries'
import { useQuery } from '@apollo/client'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'


const Authors = ({ show, token }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [editAuthor] = useMutation(EDIT_AUTHOR)
  const handleEditAuthor = (event) => {
      event.preventDefault()
      editAuthor({ variables: { name, setBornTo: parseInt(born) } })
  }

  const { loading, data } = useQuery(ALL_AUTHORS)
  if (!show) {
    return null
  }
  if (loading) return 'Loading...'
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {
        token !== null ?
        <div>
            <h2>Set birthyear</h2>
                <form onSubmit={handleEditAuthor}>
                        <select onChange={({ target }) => setName(target.value)}>
                            <option>--- Select author ---</option>
                            {
                                data.allAuthors.map(author => {
                                    return (
                                        <option key={author.id} value={author.name}>{author.name}</option>
                                    )
                                })
                            }
                        </select>
                        <br />
                        born<input onChange={({ target }) => setBorn(target.value)} type="number" required/>
                        <br />
                        <input type="submit" />
                </form>
        </div>
        :
        null
      }
    </div>
  )
}

export default Authors