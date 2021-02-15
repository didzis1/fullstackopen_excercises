import React from 'react'
import Person from './Person'


const Persons = ({ filtered, persons, onDelete }) => {
if (filtered.length > 0) {
    return (
        filtered.map((person => {
            return <Person 
                        key={person.name} 
                        name={person.name} 
                        number={person.number}
                        onDelete={onDelete}
                    />
        }))
    )
} else {
    return (
        persons.map((person => {
            return <Person 
                        key={person.name} 
                        name={person.name} 
                        number={person.number}
                        onDelete={() => onDelete(person.id, person.name)}
                    />
        }))
    )
}
}

export default Persons