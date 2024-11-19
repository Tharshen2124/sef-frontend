import { useState } from 'react';
import './App.css'

function App() {
  
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
