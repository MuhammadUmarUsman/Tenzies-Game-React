import './App.css';
import React from 'react';
import Die from './Components/Die';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti';

function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const firstElem = dice[0].value
    const allHeld = dice.every(die => die.isHeld)
    const allSame = dice.every(die => die.value === firstElem)
    if (allHeld && allSame) {
      setTenzies(true)
      console.log("You won!")
    }
  }, [dice])

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push({ value: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid() })
    }
    return newDice
  }

  function rollDice() {
    !tenzies ? setDice(dice.map(die => {
      return !die.isHeld ? { value: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid() } : die
    })) : setDice(allNewDice())
    setTenzies(false)
  }

  function holdDice(id) {
    setDice(dice.map(die => {
      return die.id === id ? { ...die, isHeld: !die.isHeld } : die
    }))
  }
  return (
    <main className="App">
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
        {dice.map(die => {
          return <Die value={die.value} key={die.id} id={die.id} isHeld={die.isHeld} holdDice={holdDice} />
        })}
      </div>
      <button className='roll-dice-btn' onClick={rollDice}>{tenzies ? 'New Game' : 'Roll'}</button>
    </main>
  );
}

export default App;
