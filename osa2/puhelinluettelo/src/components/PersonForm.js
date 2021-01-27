import React from 'react'

const PersonForm = ({name,number,handleName,handleNum,handleAddPerson}) => {


    return (
        <div>
            <form>
                <div>
                    Name: <input value={name} onChange={handleName}/>
                </div>
                <div>
                    Number: <input value={number} onChange={handleNum}/>
                </div>
                <div>
                    <button onClick={handleAddPerson}>Add</button>
                </div>
            </form>
        </div>
    )
}


export default PersonForm