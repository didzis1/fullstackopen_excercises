import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({header}) => {
  return (
    <div>
      <h1>{header}</h1>
    </div>
  )
}

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const StatisticsLine = ({text, statsContent}) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{statsContent}</td>
      </tr>
    </>
  )
}


const Statistics = ({good, neutral, bad}) => {
  const allStats = good + neutral + bad

  const averageStats = () => {
    let counter = 0
    counter += good
    counter -= bad
    const avgStat = counter / (allStats)
    // Rounded to two decimals to look cleaner
    return avgStat.toFixed(2)
  }

  const positiveStats = () => {
    const positiveOutcome = (good / allStats) * 100
    // Rounded to two decimals to look cleaner
    return positiveOutcome.toFixed(2) + " %"
  }

  if (allStats === 0) {
    // Jos palautetta ei ole annettu, tulostuu 'no feedback' viesti
    return (
      <>
        <table>
          <tbody>
            <tr>
              <td>no feedback</td>
            </tr>
          </tbody>  
        </table>
      </>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <StatisticsLine text='Good' statsContent={good}/>
          <StatisticsLine text='Neutral' statsContent={neutral}/>
          <StatisticsLine text='Bad' statsContent={bad}/>
          <StatisticsLine text='All' statsContent={allStats} />
          <StatisticsLine text='Average' statsContent={averageStats()} />
          <StatisticsLine text='Positive' statsContent={positiveStats()} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodFeedback = () => {
    setGood(good + 1)
  }

  const neutralFeedback = () => {
    setNeutral(neutral + 1)
  }

  const badFeedback = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header header='Give feedback' />
      <Button handleClick={goodFeedback} text='Good' />
      <Button handleClick={neutralFeedback} text='Neutral' />
      <Button handleClick={badFeedback} text='Bad' />
      <Header header='Statistics' />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root'))