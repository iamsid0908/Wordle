import React, { useContext } from 'react'
import { AppContext } from '../App'
import "./Letter.css"


function GameOver() {
    const{
        currAttempt,
        gameOver,
        correctWord,
        }=useContext(AppContext);  
  return (
    <div className='gameover'>
     <h3>
         {gameOver.guessedWord
         ? "You Correctly gussed" 
         : "You failed"}
         </h3>   
     <h1>Correct: {correctWord}</h1>
     {gameOver.guessedWord && (
       <>
        <h3>You gussed in {currAttempt.attempt} attempt</h3>
       </>
        
     )
     }
    
    </div>
  )
}

export default GameOver;