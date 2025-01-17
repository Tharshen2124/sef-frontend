import { 
  BrowserRouter as Router, Route, Routes 
} from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/" element={<MainPage />} />
          <Route path="/publicuser/hawkers" element={<HawkerCard />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
