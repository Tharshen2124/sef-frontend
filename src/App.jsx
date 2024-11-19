import { useState } from 'react';
import './App.css'

function App() {
  // provides 2 things -> variable, and a function that updates the variable
  const [counter, setCounter] = useState(0);

  const Adding = () => {
    setCounter(prevCount => prevCount + 1);
    console.log("counter", counter)
  }

  const Subtract = () => {
    setCounter(prevCount => prevCount - 1);
    console.log("counter", counter)
  }

  const Reset = () => {
    setCounter(0);
    console.log("counter", counter)
  }

  return (
    <>
      <h1>Number: {counter}</h1>
      <button onClick={()=>Adding()}>Click Me</button>
      <button onClick={()=>Subtract()}>subtract Me</button>
      <button onClick={()=>Reset()}>reset Me to zeroo</button>
    </>
  )
}

export default App
