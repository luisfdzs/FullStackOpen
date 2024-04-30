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
  return (
    <>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
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
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App