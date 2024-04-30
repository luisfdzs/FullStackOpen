import { useState } from 'react'

const Button = (props) => <button onClick={props.updateCount}>{props.text}</button>
const Statistic = (props) => <p>{props.text} {props.count}</p>

const GiveFeedbakc = ({updateGoods, updateNeutrals, updateBads}) => (
  <>
    <h1>give feedback</h1>
    <Button updateCount={updateGoods} text={'good'}/>
    <Button updateCount={updateNeutrals} text={'neutral'}/>
    <Button updateCount={updateBads} text={'bad'}/>
  </>
)
const Statistics = ({good, neutral, bad}) => {
  const all = good+neutral+bad
  const average = (good-bad)/all
  const positive = good/all*100
  return (
    <>
      <Statistic text={'good'} count={good}/>
      <Statistic text={'neutral'} count={neutral}/>
      <Statistic text={'bad'} count={bad}/>
      <Statistic text={'all'} count={all}/>
      <Statistic text={'average'} count={average}/>
      <Statistic text={'positive'} count={positive}/>
    </>
  )
}
const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const updateGoods = () => setGood(g => g+1)
  const updateNeutrals = () => setNeutral(n => n + 1)
  const updateBads = () => setBad(b => b + 1)

  return (
    <div>
      <GiveFeedbakc updateGoods={updateGoods} updateNeutrals={updateNeutrals} updateBads={updateBads}/>
      <h1>statistics</h1>
      {good+neutral+bad > 0 ? <Statistics good={good} neutral={neutral} bad={bad}/> : <p>No feedback given</p>}
    </div>
  )
}

export default App