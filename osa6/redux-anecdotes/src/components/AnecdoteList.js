import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from '../reducers/notificationReducer'

const AnicdoteList = () => {

    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const filteredAnecdotes = anecdotes.filter(anecdote => 
        anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    filteredAnecdotes.sort((a, b) => b.votes - a.votes)

    const dispatch = useDispatch()

    const voteAnecdote = (anecdote) => {
        dispatch(removeNotification())
        dispatch(vote(anecdote))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 3))
    }

    return (
        <div>
            {filteredAnecdotes
            .map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => voteAnecdote(anecdote)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnicdoteList