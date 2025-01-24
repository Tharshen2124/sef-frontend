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
import HLMDashboardPage from './pages/HLM/HLMDashboardPage';
import FeedbackMoreInfoPage from './pages/PublicUsers/FeedbackMoreInfoPage';
import SubmitFeedbackFormPage from './pages/PublicUsers/SubmitFeedbackFormPage';
import ApplicationSubmissionStatusPage from './pages/Hawkers/ApplicationSubmissionStatusPage';
import AccountSelection from './pages/accountSelection';
import HawkerFeedbackPage from './pages/Hawkers/HawkerFeedbackPage';
import RenewLicensePage from './pages/Hawkers/RenewLicensePage';
import HawkerProfilePage from './pages/Hawkers/HawkerProfilePage';
import HLMInspectionReportPage from './pages/HLM/HLMInspectionReportPage';
import HawkerDashboardPage from './pages/Hawkers/HawkerDashboardPage';
import AdminDashboardPage from './pages/Admin/AdminDashboardPage';
import PublicUserSignUpPage from './pages/PublicUsers/PublicUserSignUpPage';

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/" element={<MainPage />} />
          <Route path="/accountSelection" element={<AccountSelection />} />
          
          {/* Public User routes */}
          <Route path="/publicuser/signup" element={<PublicUserSignUpPage />} />
          <Route path="/publicuser/hawkers" element={<HawkerPage />} />
          <Route path="/publicuser/hawkers/1" element={<HawkerMoreInfoPage/>} />
          <Route path="/publicuser/feedback" element={<FeedbackPage/>} />
          <Route path="/publicuser/feedback/submit-feedback" element={<SubmitFeedbackFormPage />} />
          <Route path="/publicuser/feedback/1" element={<FeedbackMoreInfoPage />} />

          {/* Hawker routes */}
          <Route path="/hawker/dashboard" element={<HawkerDashboardPage />} />
          <Route path="/hawker/application-submissions-status" element={<ApplicationSubmissionStatusPage />} />
          <Route path="/hawker/feedback" element={<HawkerFeedbackPage />} />
          <Route path="/hawker/renew-license" element={<RenewLicensePage />} />
          <Route path="/hawker/profile" element={<HawkerProfilePage />} />

          {/* System Admin routes */}
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/hawker-applications" element={<HawkerApplicationReviewPage />}/>
          <Route path="/admin/manage-user-accounts" element={<ManageUserAccountPage />} />

          {/* Hawker License Manager routes */}
          <Route path="/hlm/hawker-applications" element={<HLMHawkerApplicationPage />} />
          <Route path="/hlm/hawker-dashboard" element={<HLMDashboardPage/>} />
          <Route path="/hlm/inspection-reports" element={<HLMInspectionReportPage />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
