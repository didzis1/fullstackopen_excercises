import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const Heading = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  )
}

const TextContent = ({content}) => {
  return (
    <div>
        <p>{content}</p>
    </div>
  )
}

const ShowVotes = ({votes}) => {
  // console.log(props)
  return (
    <>
      <p>This anecdote has {votes} votes.</p>
    </>
  )
}

const MostUpvoted = ({votes}) => {
  // console.log(votes)

  // Haetaan äänestetyin anekdootti
  const mostUpvotes = Math.max(...votes)
  // Haetaan indeksi, jonka avulla löydetään anekdootti taulukosta
  const maxIndex = votes.findIndex(elem => elem === mostUpvotes)
  const bestAnecdote = anecdotes[maxIndex]
  return (
    <>
    <TextContent content={bestAnecdote} />
    <ShowVotes votes={mostUpvotes} />
    </>
  )
}

const App = (props) => {
  const voteList = Array.apply(null, new Array(props.anecdotes.length)).map(Number.prototype.valueOf, 0)

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(voteList)

  const generateNumber = () => {
    const range = props.anecdotes.length
    const randomNumber = Math.floor(Math.random()*range)
    setSelected(randomNumber)
  }

  const voteAnecdote = () => {
    // Taulukon kopiointi
    const newVotes = [...votes]
    newVotes[selected] += 1
    // Asetetaan uusi taulukko tilaan
    setVotes(newVotes)
  }
  return (
    <div>
      <Heading text={'Anecdote of the day'}/>
      <TextContent content={anecdotes[selected]}/>
      <ShowVotes votes={votes[selected]}/>
      <Button handleClick={voteAnecdote} text='vote' />
      <Button handleClick={generateNumber} text='next anecdote'/>
      <Heading text={'Most upvoted anecdote'} />
      <MostUpvoted votes={votes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)