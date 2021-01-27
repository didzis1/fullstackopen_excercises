import React from 'react'

const Course = ({course}) => {
    // console.log(course);
    return (
      <>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts}/>
      </>
    )
  }


  const Header = (props) => {
    // console.log(props);
    return (
      <>
        <h1>{props.course}</h1>
      </>
    )
  }
  
  const Part = ({part}) => {
    return(
      <>
        <p>{ part.name } { part.exercises }</p>
      </>
    )
  }
  
  const Content = ({parts}) => {
    // console.log(parts)
    return (
      <>
        {parts.map(part => {
          return <Part key={part.id} part={part}/>
        })}
      </>
    )
  }
  
  const Total = ({parts}) => {
    const total = parts.reduce((sum, parts) => sum + parts.exercises, 0)
    return (
      <>
        <strong>Total number of exercises {total}</strong>
      </>
    )
  }

export default Course