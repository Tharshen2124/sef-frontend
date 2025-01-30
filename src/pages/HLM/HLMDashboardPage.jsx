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
          <button className="hawkerApplicationsbutton">
              <img src={hawkerApplications} alt="test" />
                <p>Hawker Application</p>
          </button>            

          <button className="inspectionsReportsbutton">
            <img src={inspectionReports} alt="test" />
              <p>Inspections Reports</p>
          </button>

          <button className="manageHawkerAccountsbutton">
            <img src={manageHawkerAccounts} alt="test" />
              <p>Manage Hawker Accounts</p>
          </button>
      </div>
      </div>
    </div>
</>
    
  );
};

export default HLMDashboardPage;
