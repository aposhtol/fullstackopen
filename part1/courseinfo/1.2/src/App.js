
const App = () => {
  const course = 'Half Stack Application Development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content p1={part1} ex1={exercises1} p2={part2} ex2={exercises2} p3={part3} ex3={exercises3}/>
      <Total ex1={exercises1} ex2 = {exercises2} ex3 = {exercises3}/>

  </div>
  )


}
export default App;

const Header = (props) => (
  <h1>{props.course}</h1>
)

const Content = (props) => {
  
  return(
  <div>
    <Part p={props.p1} ex={props.ex1}/>
    <Part p={props.p2} ex={props.ex2}/>
    <Part p={props.p3} ex={props.ex3}/>
    
  </div>
  )
}
const Total = (props) => (
  <p>Number od exercises {props.ex1 + props.ex2 + props.ex3}</p>
)

const Part = (props) => (
  <p>{props.p} {props.ex}</p>
)