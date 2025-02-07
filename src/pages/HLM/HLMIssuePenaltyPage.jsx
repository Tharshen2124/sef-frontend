import React, { useState } from 'react';
import { supabase } from "../../utils/supabaseClient"; // Import Supabase
import HLMNavigationBar from "../../components/HLM/NavigationBarHLM";
import './HLMIssuePenaltyPage.css';
import { BlueFileInput } from '../../components/General/BlueFileInput';
import { useNavigate, useParams } from 'react-router-dom';

const HLMIssuePenaltyPage = () => {
  const { hawkerID } = useParams()
  const navigate = useNavigate()
  const [document, setDocument] = useState(null);
  const [penaltyAmount, setPenaltyAmount] = useState("");
  const [violationType, setViolationType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDocumentChange = (file) => setDocument(file);
  const handlePenaltyAmountChange = (e) => setPenaltyAmount(e.target.value);
  const handleViolationChange = (e) => setViolationType(e.target.value);

  async function uploadDocument() {
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('PenaltyDocument')
      .upload(document.name, document, {
          cacheControl: '3600',
          upsert: false,
      });

    if(uploadError) {
      console.error("error occured", uploadError);
    }

    const { data: getData } = await supabase
      .storage
      .from('PenaltyDocument')
      .getPublicUrl(uploadData.path);   
    
    if(!getData) {
      console.error("No image retrieved")
    }

    return getData.publicUrl
  }

  // Function to submit penalty details to Supabase
  const handleSubmit = async () => {
    if (!violationType || !penaltyAmount || !document) {
      alert("Please fill in all required fields.");
      return;
    }

    const penaltyDocumentUrl = await uploadDocument()

    setLoading(true);

    const { data, error } = await supabase
      .from("Penalty")
      .insert([
      {
        violationType,
        penaltyAmount,
        document: penaltyDocumentUrl,
        hawkerID: hawkerID
      }
    ]);

    setLoading(false);

    if (error) {
      console.error("Error inserting penalty:", error.message);
      alert("Failed to issue penalty.");
    } else {
      alert("Penalty issued successfully!");
      setViolationType("");
      setPenaltyAmount("");
      setDocument(null);
      navigate("/hlm/manage-hawker-accounts")
    }
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

            {/* Violation Type Dropdown */}
            <div className="violationtype">
              <label htmlFor="violationType">Violation Type: </label>
              <select 
                id="violationType"
                value={violationType}
                onChange={handleViolationChange}
                className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1 w-full"
              >
                <option value="" disabled>Select One...</option>
                <option value="Violation A">Violation A</option>
                <option value="Violation B">Violation B</option>
              </select>
            </div>

            {/* Penalty Amount Input */}
            <div className="penaltyAmount">
              <label htmlFor="penaltyAmount">Penalty Amount: </label>
              <input 
                type="text"
                id="penaltyAmount"
                value={penaltyAmount}
                onChange={handlePenaltyAmountChange}
                placeholder="RM ...."
                name="amountofpenalty"
                className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1"
              />
            </div>

            {/* Penalty Document Upload */}
            <div className="penaltydocument">
              <label htmlFor="penaltyDocument">Penalty Document: </label>
              <BlueFileInput 
                onChange={handleDocumentChange}
                type="text"
                className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1"
              />
            </div>

            <button 
              type="button"
              className="submit"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HLMIssuePenaltyPage;
