import React from 'react'


const Person = ({ name, number, onDelete}) => {
    return (
        <>
        <span>{name} {number}</span>
        <button onClick={onDelete}>Delete</button>
        <br/>
        </>
    )
}

export default Person