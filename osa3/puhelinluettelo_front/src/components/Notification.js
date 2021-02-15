import React from 'react'

const Notification = ({message}) => {
    if (Object.keys(message).length === 0) {
        return null
    }

    const messageStyles = {
        color: message.isError ? 'red' : 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    return (
        <div style={messageStyles}>
            {message.text}
        </div>
    )
}

export default Notification