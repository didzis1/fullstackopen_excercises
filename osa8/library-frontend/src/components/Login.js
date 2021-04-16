import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const Login = ({ setToken, show }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [ login, result ] = useMutation(LOGIN, {
        onError: (error) => {
            console.log(error.graphQLErrors[0].message)
        }
    })

    useEffect(() => {
        if ( result.data ) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('library-user-token', token)
        }
    }, [result.data]) // eslint-disable-line

    if (!show) {
        return null
    }

    const handleLogin = (event) => {
        event.preventDefault()
        console.log('logged')
        login({ variables: { username, password } })
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                username 
                <input 
                    onChange={({ target }) => setUsername(target.value)} 
                    type="text"
                    value={username}
                />
                <br />
                password 
                <input 
                    onChange={({ target }) => setPassword(target.value)} 
                    type="password" 
                    value={password}
                />
                <br />
                <button type="submit">login</button>
            </form>
        </div>
    )
}


export default Login