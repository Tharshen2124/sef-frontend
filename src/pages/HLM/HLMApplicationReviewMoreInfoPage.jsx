import React, { useState } from 'react';
import ArrowUpload from "../../assets/arrowupload.svg";
import HLMNavigationBar from "../../components/HLM/NavigationBarHLM";
import './HLMApplicationReviewMoreInfoPage.css';

const HLMApplicationReviewMoreInfoPage = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
      console.log("File dropped:", e.dataTransfer.files[0].name);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log("File selected:", e.target.files[0].name);
  };

  return (
    <>
      <HLMNavigationBar />
      <div>
        <div className="linktopleft">
          <a href="" className="pathway">Inspection Reports</a>
          <span className="pathway2"> {">"} </span>
          <a href="" className="pathway3">Issue Penalty</a>
        </div>
        <div className="issuePenaltyContainer">
          <div className="issuePenaltyForm">
            <h1>Issue Penalty</h1>
            <h3>To: Name of the Hawker</h3>
            <div className="violationtype">
              <label htmlFor="">Violation Type: </label>
              <input type="text" placeholder='Select One...' name='placeviolationtype' />
            </div>
            <div className="penaltyAmount">
              <label htmlFor="">Penalty Amount: </label>
              <input type="text" placeholder='RM ....' name='amountofpenalty' />
            </div>
            <div className="penaltydocument">
              <label htmlFor="">Penalty Document: </label>
              <div
                className={`upload-area ${dragActive ? 'drag-active' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {selectedFile ? (
                  <div>Selected file: {selectedFile.name}</div>
                ) : (
                  <div className="upload-content">
                    <img src={ArrowUpload} alt="test" />
                    <div className="upload-text">
                      <label htmlFor="fileUpload" className="choose-file">Choose a file</label>
                      <span> or drag and drop it here</span>
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  id="fileUpload"
                  className="hidden-input"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <button type='submit' className="submit">Submit</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HLMApplicationReviewMoreInfoPage;
