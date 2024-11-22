import { useState } from 'react';
import LoginPage from './login';
import { 
  BrowserRouter as Router, Route, Routes 
} from 'react-router-dom';


function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="skibidi" element={<LoginPage />}/>

        </Routes>
      </Router>

    </>
  )
}

export default App
