import React, { useState } from 'react'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Logout from './components/Logout'
import Recommended from './components/Recommended'

import { ME_USER, BOOK_ADDED, ALL_BOOKS } from './queries'




const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const currentUser = useQuery(ME_USER)
  const client = useApolloClient()

  const updateCacheWith = (bookAdded) => {
    const includedIn = (set, object) => 
      set.map(b => b.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if(!includedIn(dataInStore.allBooks, bookAdded)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(bookAdded) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`A book called ${addedBook.title} got added.`)
      updateCacheWith(addedBook)
    }
  })

  if (currentUser.loading) return 'Loading...'

  // Redirect to author if logged
  if (page === 'login' && token !== null) {
    setPage('authors')
  }

  if (!token) {
    return (
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>login</button>

        <div>
          <Authors
            show={page === 'authors'}
            token={token}
          />

          <Books
            show={page === 'books'}
          />
          
          <Login
            show={page === 'login'}
            setToken={setToken}
          />
        </div>

      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('recommended')}>recommended</button>
        <button onClick={() => setPage('add')}>add book</button>
        <Logout setToken={setToken}/>
      </div>

        <Authors
        show={page === 'authors'}
        token={token}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        updateCacheWith={updateCacheWith}
      />

      <Recommended 
        show={page === 'recommended'}
        favoriteGenre={currentUser.data || 'all genres'}
      />

      <Login
        show={page === 'login'}
        setToken={setToken}
      />

    </div>
  )
}

export default App