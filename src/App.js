import './App.css';
import { useState ,useEffect } from 'react';
import Board from './Componenet/Board';
import Keyboard from './Componenet/Keyboard';
import {createContext} from "react"
import { boardDefault ,generateWordSet} from './Words';
import GameOver  from './Componenet/GameOver';

export const AppContext=createContext();

function App() {
  const[board,setBoard]=useState(boardDefault);
  const[currAttempt,setCurrentAttempt]=useState({attempt:0,letterPos:0});
  const[wordSet,setWordSet]=useState(new Set())
  const [correctWord,setCorrectWord]=useState("");
  // const correctWord="RIGHT"
  const [gameOver,setGameOver]=useState({
    gameOver:false,
    guessedWord:false,
  });
  // console.log(board);
  
  useEffect(() => {
    generateWordSet().then((words)=>{
      // console.log(words);
      setWordSet(words.wordSet);
      // console.log(words.todaysWord);
      setCorrectWord(String(words.todaysWord));
      // setCorrectWord("ABACK");
    });
  },[]) //empty depandancy list so render once
  // console.log(correctWord);

  const onSelectLetter=(keyVal)=>{
    if(currAttempt.letterPos>4){
      return;
    }
      const newBoard=[...board];
      newBoard[currAttempt.attempt][currAttempt.letterPos]=keyVal;
      setBoard(newBoard);
      setCurrentAttempt({...currAttempt,letterPos:currAttempt.letterPos+1});
  
  }
  const onDelete=()=>{
    const newBoard=[...board];
    
         newBoard[currAttempt.attempt][currAttempt.letterPos-1]="";
         if(currAttempt.letterPos<0){
           currAttempt.letterPos=1;
         }
         setBoard(newBoard);
         setCurrentAttempt({...currAttempt,letterPos:currAttempt.letterPos-1});
  }
  const onEnter=()=>{
    if(currAttempt.letterPos!==5) return;
    let currWord="";
    for(let i=0;i<5;i++){
      currWord += board[currAttempt.attempt][i];
    }
    if(wordSet.has(currWord)){
    setCurrentAttempt({attempt:currAttempt.attempt+1,letterPos:0});
    }else{
      alert("Word Not Found");
    }
    if(currWord===correctWord){
      setGameOver({gameOver:true,guessedWord:true});
      return;
    }
    if(currAttempt.attempt===5){
      setGameOver({gameOver:true,guessedWord:false})
    }
  };
  return (
    <div className="App">
      <nav className='nav'>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider value={{
        board,
        setBoard,
        currAttempt,
        setCurrentAttempt,
        onSelectLetter,
        onEnter,
        onDelete,
        correctWord,
        gameOver,
        setGameOver}}>
      <Board/>
      {gameOver.gameOver ? <GameOver/> : <Keyboard/>}
      
     
      </AppContext.Provider>
    </div>
  );
}

export default App;
