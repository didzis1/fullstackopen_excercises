import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {
    // console.log(props)
    const submitAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.addAnecdote(content)
        props.setNotification(`you added \`${content}\` successfully`)
        setTimeout(() => {
            props.removeNotification()
        }, 5000)
      }

    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={submitAnecdote}>
                <div>
                <input type="text" name="anecdote" />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}


const ConnectedAnecdoteForm = connect(
    null,
    { addAnecdote, setNotification, removeNotification }
)(AnecdoteForm)

export default ConnectedAnecdoteForm