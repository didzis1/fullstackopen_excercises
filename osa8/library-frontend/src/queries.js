import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
        query findAllPersons {
            allAuthors {
                    name
                    born
                    bookCount
                    id
            }
        }
`

export const ALL_BOOKS = gql`
        query findAllBooks {
            allBooks {
                title
                author {
                    name
                }
                published
                id
                genres
            }
        }
`

export const CREATE_BOOK = gql`
        mutation createBook($title: String!, $published: Int, $author: String!, $genres: [String!]!) {
            addBook(
                title: $title,
                published: $published,
                author: $author,
                genres: $genres
            ) {
                title
                published
                author {
                    name
                }
                genres
            }
        }
`

export const EDIT_AUTHOR = gql`
        mutation editAuthor($name: String!, $setBornTo: Int!) {
            editAuthor(name: $name, setBornTo: $setBornTo) {
                name
                born
                bookCount
                id
            }
        }
 `

 export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
 `

 export const BOOKS_BY_GENRE = gql`
    query findBookByGenre($genre: String) {
        allBooks(genre: $genre) {
            title
            author {
                name
            }
            published
            id
            genres
        }
    }
 `

export const ME_USER = gql`
    query findCurrentUser {
        me {
            favoriteGenre
        }
    }
`

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            title
                published
                author {
                    name
                }
                genres
        }
    }
`