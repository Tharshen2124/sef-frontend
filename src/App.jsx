import { 
  BrowserRouter as Router, Route, Routes 
} from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import HawkerPage from './pages/PublicUsers/HawkerPage';
import HawkerMoreInfoPage from './pages/PublicUsers/HawkerMoreInfoPage';
import FeedbackPage from './pages/PublicUsers/Feedback';
import HawkerApplicationReviewPage from './pages/Admin/HawkerApplicationReviewPage';
import ManageUserAccountPage from './pages/Admin/ManageUserAccountPage';
import HLMHawkerApplicationPage from './pages/HLM/HLMHawkerApplicationPage';
import FeedbackMoreInfoPage from './pages/PublicUsers/FeedbackMoreInfoPage';
import SubmitFeedbackFormPage from './pages/PublicUsers/SubmitFeedbackFormPage';
import ApplicationSubmissionStatusPage from './pages/Hawkers/ApplicationSubmissionStatusPage';

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
          <Route path="/publicuser/feedback/submit-feedback" element={<SubmitFeedbackFormPage />} />
          <Route path="/publicuser/feedback/1" element={<FeedbackMoreInfoPage />} />

          {/* Hawker routes */}
          <Route path="/hawker/application-submissions-status" element={<ApplicationSubmissionStatusPage />} />


          {/* System Admin routes */}
          <Route path="/admin/hawker-applications" element={<HawkerApplicationReviewPage />}/>
          <Route path="/admin/manage-user-accounts" element={<ManageUserAccountPage />} />

          {/* Hawker License Manager routes */}
          <Route path="/hlm/hawker-applications" element={<HLMHawkerApplicationPage />} />
        
        </Routes>
      </Router>

    </>
  )
}

export default App
