import React, { useContext } from 'react'
import "./Keyboard.css"
import {AppContext} from "../App"

function Key({keyVal ,bigKey}) {
    const{onDelete,onEnter,onSelectLetter}=useContext(AppContext);


    const selectLetter=()=>{
      if(keyVal==="ENTER"){
        onEnter();
      }else if(keyVal==="DEL"){
        onDelete();
      }else{
      onSelectLetter(keyVal); 
      }
  };
  return (
    <div className='keys'id={bigKey && "bigKey"} onClick={selectLetter}>
    {keyVal}
    </div> 
  )
}


export default Key;