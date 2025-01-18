import { 
  BrowserRouter as Router, Route, Routes 
} from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import HawkerPage from './pages/PublicUsers/HawkerPage';
import HawkerMoreInfoPage from './pages/PublicUsers/HawkerMoreInfoPage';
import FeedbackPage from './pages/PublicUsers/Feedback';

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/" element={<MainPage />} />
          
          {/* Public User routes */}
          <Route path="/publicuser/hawkers" element={<HawkerPage />} />
          <Route path="/publicuser/hawkers/1" element={<HawkerMoreInfoPage/>} />
          <Route path="/publicuser/feedback" element={<FeedbackPage/>} />

          {/*  */}
        
        </Routes>
      </Router>

    </>
  )
}

export default App
