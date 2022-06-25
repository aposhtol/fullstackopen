import React from "react";

const Persons = ({deleteData, persons, newSearch}) => {

    const namesToShow = persons.filter(i => i.name.toLowerCase().indexOf(newSearch.toLowerCase()) >= 0)

    return (
        <div>
        {namesToShow.map(person => 
           <div key={person.id}>{person.name} {person.number} <button onClick={() => deleteData(person.id, person.name)}>delete</button></div>
        )}
        </div>    
    )

}

export default Persons  