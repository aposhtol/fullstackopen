import React from "react"

const Course = ({course}) => {
  const sum = course.parts.reduce((a,b) => {
    return (
      a + b.exercises)}, 0)
   
  return (
    <div>
    <h3>{course.name}</h3>
    
    {course.parts.map(part => 
      <div key = {part.id}>
        {part.name} {part.exercises}
      </div>
    )}
  
    <b>total of {sum} exercises</b>
    </div>
    )
}

  export default Course