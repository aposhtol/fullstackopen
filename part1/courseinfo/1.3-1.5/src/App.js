
const App = () => {
  const course = {
    name: 'Half Stack Application Development',
    parts: [
      {name: 'Fundamentals of React',
      exercises: 10
      },
      {
      name: 'Using props to pass data',
      exercises: 7
      },
      {
      name: 'State of a component',
      exercises: 14
      }
    ]
  }  
  return (
    <div>
      <Header course={course} />
      <Content parts={course}/>
      <Total parts={course}/>

  </div>
  )
}

const Header = props => 
  <h1>{props.course.name}</h1>

const Content = props => 
  <div>
    <Part p={props.parts.parts[0].name} ex={props.parts.parts[0].exercises}/>
    <Part p={props.parts.parts[1].name} ex={props.parts.parts[1].exercises}/>
    <Part p={props.parts.parts[2].name} ex={props.parts.parts[2].exercises}/>
  </div>
  
const Total = props => 
  <p>Number od exercises {props.parts.parts[0].exercises + props.parts.parts[1].exercises + props.parts.parts[2].exercises}</p>

const Part = props => 
<p>{props.p} {props.ex}</p>

export default App;
