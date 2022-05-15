import { useState } from "react"

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const avg = (good-bad)/all
  const pos = (good/all)*100 + ' %'

  const feedbackGood = () => {
    setAll(all + 1)
    setGood(good + 1)
  }
  const feedbackNeutral = () => {
    setAll(all + 1)
    setNeutral(neutral + 1)
  }
  const feedbackBad = () => {
    setAll(all + 1)
    setBad(bad + 1)
  }

return (
  <>
    <h1>give feedback</h1>
    <Button feedback={feedbackGood} text='good' />
    <Button feedback={feedbackNeutral} text='neutral' />
    <Button feedback={feedbackBad} text='bad' />

    <h1>statistics</h1>
    
    <Statistics good = {good} neutral = {neutral} bad = {bad} all = {all} avg = {avg} pos = {pos}/>
    
  </>
)
}

const Button = ({feedback, text}) => <button onClick={feedback}>{text}</button>
  
const StatLine = ({type, value}) => <tr><td>{type}</td><td>{value}</td></tr>
  
const Statistics = props => {
  if(props.all === 0 ) {
    return (
    <>
    No feedback given
    </>
    )
  }
  return (
    <table>
    <tbody>
    <StatLine type = 'good' value = {props.good}/>
    <StatLine type = 'neutral' value = {props.neutral}/>
    <StatLine type = 'bad' value = {props.bad}/>
    <StatLine type = 'all' value = {props.all}/>
    <StatLine type = 'average' value = {props.avg}/>
    <StatLine type = 'positive' value = {props.pos}/>
    </tbody>
    </table>
  )
}

export default App




  