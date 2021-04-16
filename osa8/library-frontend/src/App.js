import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Logout from './components/Logout'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

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

  console.log(token)

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
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
      />


      <Login
        show={page === 'login'}
        setToken={setToken}
      />

    </div>
  )
}

export default App