import HLMNavigationBar from "../../components/HLM/NavigationBarHLM";
import hawkerApplications from "../../assets/hawkerApplication.svg";
import inspectionReports from "../../assets/inspectionReports.svg";
import manageHawkerAccounts from "../../assets/manageHawkerAccounts.svg";
import './HLMDashboardPage.css';

import React from 'react'

const HLMDashboardPage = () => {
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
