import wordBank from "./wordle-bank.txt"
export const boardDefault=[
["","","","",""],
["","","","",""],
["","","","",""],
["","","","",""],
["","","","",""],
["","","","",""]
];

export const generateWordSet = async()=>{
    let wordSet;
    var todaysWord;
    await fetch(wordBank)
    .then((response)=>response.text())
    .then((result)=>{
        const wordArr= result.split("\n");
       
        wordSet=new Set(wordArr);
        todaysWord=wordArr[Math.floor(Math.random()*wordArr.length-1)];
    });
    return {wordSet,todaysWord};
};