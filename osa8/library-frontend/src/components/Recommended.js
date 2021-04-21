import React from 'react'
import { BOOKS_BY_GENRE } from '../queries'
import { useQuery } from '@apollo/client'

const Recommended = ({ show, favoriteGenre }) => {
    const genreBooks = useQuery(BOOKS_BY_GENRE, {
        fetchPolicy: 'cache-and-network',
        skip: !show,
        variables: { genre: favoriteGenre.me.favoriteGenre.toLowerCase() }
    })

    if (genreBooks.loading) return 'Loading...'

    // console.log(genreBooks)

    if (!show) {
        return null
    }

    return (
        <div>
            <p>books in your favorite genre <strong></strong></p>
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
                        genreBooks.data.allBooks.map(book => 
                            <tr key={book.title}>
                            <td>{book.title}</td>
                            <td>{book.author.name}</td>
                            <td>{book.published}</td>
                          </tr>
                            )
                    }
                    </tbody>
        </table>
        </div>
    )
}

export default Recommended