import LoginPage from './login';
import { 
  BrowserRouter as Router, Route, Routes 
} from 'react-router-dom';
import MainPage from './pages/MainPage';

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="skibidi" element={<LoginPage />}/>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
