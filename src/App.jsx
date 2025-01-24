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
import EditProfilePage from './pages/Hawkers/EditProfilePage';
import ApplyForLicensePage from './pages/Hawkers/ApplyForLicensePage';
import HawkerSignUpPage from './pages/HawkerSignUpPage';
import EditUserDetailsPage from './pages/Admin/EditUserDetailsPage';
import EditHawkerDetailsPage from './pages/HLM/EditHawkerDetailsPage';
import ManageHawkerAccountPage from './pages/HLM/ManageHawkerAccountsPage';
import HawkerApplicationReviewMoreDetailsPage from './pages/Admin/HawkerApplicationReviewMoreDetailsPage';
import HLMHawkerApplicationReviewMoreDetailsPage from './pages/HLM/HLMHawkerApplicationReviewMoreDetailsPage';
import HLMInspectionReportMoreDetailsPage from './pages/HLM/HLMInspectionReportMoreDetailsPage';
import HLMHawkerMoreDetailsPage from './pages/HLM/HLMHawkerMoreDetailsPage';
import AdminUserMoreDetailsPage from './pages/Admin/AdminUserMoreDetailsPage';

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/" element={<MainPage />} />
          <Route path="/accountSelection" element={<AccountSelection />} />
          <Route path="/hawker-signup" element={<HawkerSignUpPage />}/>

          {/* Public User routes */}
          <Route path="/publicuser/signup" element={<PublicUserSignUpPage />} />
          <Route path="/publicuser/hawkers" element={<HawkerPage />} />
          <Route path="/publicuser/hawkers/1" element={<HawkerMoreInfoPage/>} />
          <Route path="/publicuser/feedback" element={<FeedbackPage/>} />
          <Route path="/publicuser/feedback/submit-feedback" element={<SubmitFeedbackFormPage />} />
          <Route path="/publicuser/feedback/1" element={<FeedbackMoreInfoPage />} />

          {/* Hawker routes */}
          <Route path="/hawker/profile/edit" element={<EditProfilePage />} />
          <Route path="/hawker/dashboard" element={<HawkerDashboardPage />} />
          <Route path="/hawker/application-submissions-status" element={<ApplicationSubmissionStatusPage />} />
          <Route path="/hawker/feedback" element={<HawkerFeedbackPage />} />
          <Route path="/hawker/renew-license" element={<RenewLicensePage />} />
          <Route path="/hawker/profile" element={<HawkerProfilePage />} />
          <Route path="/hawker/apply-license" element={<ApplyForLicensePage />} />

          {/* System Admin routes */}
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/hawker-applications" element={<HawkerApplicationReviewPage />}/>
          <Route path="/admin/manage-user-accounts" element={<ManageUserAccountPage />} />
          <Route path="/admin/users/edit" element={<EditUserDetailsPage />} />
          <Route path="/admin/hawker-applications/1" element={<HawkerApplicationReviewMoreDetailsPage />} />
          <Route path="/admin/manage-user-accounts/1" element={<AdminUserMoreDetailsPage />} />

          {/* Hawker License Manager routes */}
          <Route path="/hlm/hawker-applications" element={<HLMHawkerApplicationPage />} />
          <Route path="/hlm/hawker-dashboard" element={<HLMDashboardPage/>} />
          <Route path="/hlm/inspection-reports" element={<HLMInspectionReportPage />} />
          <Route path="/hlm/hawkers/edit" element={<EditHawkerDetailsPage />} />
          <Route path="/hlm/manage-hawker-accounts" element={<ManageHawkerAccountPage/>} />
          <Route path="/hlm/hawker-applications/1" element={<HLMHawkerApplicationReviewMoreDetailsPage />} />
          <Route path="/hlm/inspection-reports/1" element={<HLMInspectionReportMoreDetailsPage />} />
          <Route path="/hlm/manage-hawker-accounts/1" element={<HLMHawkerMoreDetailsPage />} />        
        </Routes>
      </Router>

    </>
  )
}

export default App
