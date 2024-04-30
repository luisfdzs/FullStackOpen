import { useState } from 'react'

const GiveFeedbakc = ({updateGoods, updateNeutrals, updateBads}) => {
  return (
    <>
      <h1>give feedback</h1>
      <button onClick={updateGoods}>good</button>
      <button onClick={updateNeutrals}>neutral</button>
      <button onClick={updateBads}>bad</button>
    </>
  )
}
const Statistics = ({good, neutral, bad}) => {
  const all = good+neutral+bad
  const average = (good-bad)/all
  const positive = good/all*100
  return (
    <>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive}</p>
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