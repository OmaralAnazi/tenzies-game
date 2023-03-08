import React from 'react'
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import Die from "./die"
import './style.css'

export default function App() {
    const [dice, setDice] = React.useState(getDiceArray())
    const [tenzies, setTenzies] = React.useState(false)
    const [counter, setCounter] = React.useState(0)  
  
      React.useEffect(() => {
        const firstValue = dice[0].value
        const isWin = dice.every(die => die.isHeld && die.value === firstValue)
        if (isWin) 
          setTenzies(true)
      }, [dice])
  
      function generateNewDie() {
        return {
          id: nanoid(),
          value: Math.ceil(Math.random() * 6),
          isHeld: false
        }
      }
      
      function getDiceArray() {
        return new Array(12).fill(null).map( () => generateNewDie() )
      }
      
      function rollDice() {
        if(!tenzies) {
          setDice(oldDice => oldDice.map(die => {
            return die.isHeld ? die : generateNewDie()
          }))
          setCounter(prevCounter => prevCounter+1)
        } 
        else {
          setTenzies(false)
          setCounter(0)
          setDice(getDiceArray())
        }
      }
      
      function holdDice(id) {
          setDice(oldDice => oldDice.map(die => {
              return die.id === id ? {...die, isHeld: !die.isHeld} : die
          }))
      }
      
      const diceElements = dice.map(die => (
          <Die 
              key={die.id} 
              value={die.value} 
              isHeld={die.isHeld} 
              holdDice={() => holdDice(die.id)}
          />
      ))
      
      return (
          <main>
              {tenzies && <Confetti />}
              <h1 className="title">Tenzies</h1>
              <p className="instructions"> Roll until all dice are the same. Click each die to freeze it at its current value between rolls. </p>
              <div className="dice-container"> {diceElements} </div>
              <button className="roll-dice" onClick={rollDice}> {tenzies ? "New Game" : "Roll"} </button>
              <div className="roll-counter">Rolls counter: {counter}</div>
          </main>
      )
}