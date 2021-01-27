import React from 'react'

const Filter = ({ onChange }) => {

    return (
        <div>
            Filter the phonebook: <input onChange={onChange}/>
        </div>
    )
}

export default Filter
