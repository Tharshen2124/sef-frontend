import HLMNavigationBar from "../../components/HLM/NavigationBarHLM";
import hawkerApplications from "../../assets/hawkerApplication.svg";
import inspectionReports from "../../assets/inspectionReports.svg";
import manageHawkerAccounts from "../../assets/manageHawkerAccounts.svg";
import './HLMDashboardPage.css';
import React, { useEffect } from 'react'
import useAuthStore from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";


const HLMDashboardPage = () => {
  const navigate = useNavigate()
  const { id, userType } = useAuthStore();

  useEffect(() => {
    if (id && id !== "0" && userType === 'hlm') {
      // User is authorized; no action needed
      return;
    } else {
      // User is not authorized; show alert and redirect
      alert("You are not authorized to view this page! Only Hawker license manager are allowed to view this page.");
      navigate('/');
    }
  }, [id, userType]);
  return (
    <><HLMNavigationBar/>
    <div>
    <div className="hlmDashboardPage">
      <h1>Dashboard</h1>

      <div className="hlmDPbuttons">
          <a href="/hlm/hawker-applications" className="hawkerApplicationsbutton">
              <img src={hawkerApplications} alt="test" />
                <p>Hawker Application</p>
          </a>            

          <a href="/hlm/inspection-reports" className="inspectionsReportsbutton">
            <img src={inspectionReports} alt="test" />
              <p>Inspections Reports</p>
          </a>

          <a href="/hlm/manage-hawker-accounts" className="manageHawkerAccountsbutton">
            <img src={manageHawkerAccounts} alt="test" />
              <p>Manage Hawker Accounts</p>
          </a>
      </div>
      </div>
    </div>
</>
    
  );
};

export default HLMDashboardPage;
