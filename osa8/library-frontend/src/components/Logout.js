import { useApolloClient } from '@apollo/client'
import React from 'react'


const Logout = ({ setToken }) => {
    const client = useApolloClient()

    const handleLogout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
    }

    return (
        <button onClick={handleLogout}>Logout</button>
    )
}

export default Logout