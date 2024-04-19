import './App.css';
import React from 'react';
import Die from './Components/Die';
import { nanoid } from 'nanoid'

function App() {
  const [dice, setDice] = React.useState(allNewDice())
  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push({ value: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid() })
    }
    return newDice
  }
  console.log(dice)
  function rollDice() {
    setDice(allNewDice())
  }
  return (
    <main className="App">
      <div className='dice-container'>
        {dice.map(die => {
          return <Die value={die.value} key={die.id} id={die.id} />
        })}
      </div>
      <button className='roll-dice-btn' onClick={rollDice}>Roll</button>
    </main>
  );
}

export default App;
