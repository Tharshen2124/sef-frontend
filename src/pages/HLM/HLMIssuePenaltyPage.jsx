import React, { useEffect, useState } from 'react';
import { supabase } from "../../utils/supabaseClient"; // Import Supabase
import HLMNavigationBar from "../../components/HLM/NavigationBarHLM";
import './HLMIssuePenaltyPage.css';
import { BlueFileInput } from '../../components/General/BlueFileInput';
import { useNavigate, useParams } from 'react-router-dom';
import { hawkerPenalties } from '../../utils/penaltyTypes';
import useAuthStore from '../../store/useAuthStore';

const HLMIssuePenaltyPage = () => {
  const { hawkerID } = useParams()
  const navigate = useNavigate()
  const [document, setDocument] = useState(null);
  const [penaltyAmount, setPenaltyAmount] = useState();
  const [violationType, setViolationType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hawkerInfo, setHawkerInfo] = useState(null);
  const [errors, setErrors] = useState({
    penaltyAmount: "",
    violationType: "",
    document: ""
  });
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

  useEffect(() => {
    async function fetchHawkerDetails() {
      const { data, error } = await supabase
        .from('Hawker')
        .select(`
          hawkerID,
          BusinessInfo (businessName)
        `)
        .eq('hawkerID', hawkerID)
        .single()

      setHawkerInfo(data)

      if (error) {
        console.error("Error fetching hawker details:", error.message)
        return
      }
    }

    fetchHawkerDetails()
  }, [])
    

  const handleDocumentChange = (file) => setDocument(file);

  // Function to submit penalty details to Supabase
  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsSubmitting(true);

    setErrors({
      selectedHawker: "", 
      inspectionOutcome: "", 
      inspectionDate: "", 
      inspectionTime: "", 
      inspectionRating: "", 
      inspectionPhoto: "",
      form: ""
    });    

    const validationErrors = validateForm();
    setErrors(validationErrors);
    
    if (Object.values(validationErrors).some(error => error !== "")) {
      setIsSubmitting(false);
      return; // Stop submission if there are errors
    }    

    try {
      const penaltyDocumentUrl = await uploadDocument()
      await uploadPenaltyIssue(penaltyDocumentUrl)

      alert("Penalty issued successfully!");
      navigate("/hlm/manage-hawker-accounts")
      
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error submitting penalty:", error.message);
      alert("Failed to issue penalty.");
    }
  };

  async function uploadPenaltyIssue(penaltyDocumentUrl) {
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

    if(error) {
      console.error("Error uploading site inspection details:", error);
      throw new Error(`Upload penalty issue error:`, error.message);
    }
  }

  function validateForm() {
    let newErrors = {
      penaltyAmount: "",
      violationType: "",
      document: ""
    }


    if (!penaltyAmount) {
      newErrors.penaltyAmount = "Penalty amount is required."
    } else if (penaltyAmount < 0) {
      newErrors.penaltyAmount = "Penalty amount must be a positive number.";
    } else if (penaltyAmount < 50) {
      newErrors.penaltyAmount = "Penalty amount must be at least RM 50.";
    }

    if (!violationType) {
      newErrors.violationType = "Violation type is required."
    }

    if (!document) {
      newErrors.document = "Document is required."
    } else if (document.type !== "application/pdf") {
      newErrors.document = "Document must be in PDF format.";
    }

    return newErrors
  }

  async function uploadDocument() {
    const uniqueName = `${Date.now()}_${document.name}`;

    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('PenaltyDocument')
      .upload(uniqueName, document, {
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


  return (
    <>
      <HLMNavigationBar />
      <div>
        <div className="linktopleft">
          <a href="/hlm/manage-hawker-accounts" className="pathway">Manage Account</a>
          <span className="pathway2"> {">"} </span>
          <a href={`/hlm/issue-penalty/${hawkerID}`} className="pathway3">Issue Penalty</a>
        </div>
        <form onSubmit={handleSubmit} className="issuePenaltyContainer">
          <div className="issuePenaltyForm">
            <h1>Issue Penalty</h1>
            <h3 className="mb-2">To: {hawkerInfo && hawkerInfo.BusinessInfo[0].businessName }</h3>
            {errors.form && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800">{errors.form}</p>}

            {/* Violation Type Dropdown */}
            <div className="violationtype">
              <label htmlFor="violationType">Violation Type: </label>
              <select 
                id="violationType"
                value={violationType}
                onChange={(e) => setViolationType(e.target.value)}
                className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1 w-full"
              >
                <option value="" disabled>Select One...</option>
                { hawkerPenalties.map((penalty, index) => (
                  <option key={index} value={penalty}>{penalty}</option>
                ))}
              </select>
              {errors.violationType && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800">{errors.violationType}</p>}
            </div>

            {/* Penalty Amount Input */}
            <div className="penaltyAmount">
              <label htmlFor="penaltyAmount">Penalty Amount {"(in RM)"}: </label>
              <input 
                type="number"
                id="penaltyAmount"
                value={penaltyAmount}
                onChange={(e) => setPenaltyAmount(e.target.value)}
                placeholder="400"
                name="amountofpenalty"
                className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1"
              />
              {errors.penaltyAmount && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800">{errors.penaltyAmount}</p>}
            </div>

            {/* Penalty Document Upload */}
            <div className="penaltydocument">
              <label htmlFor="penaltyDocument">Penalty Document: </label>
              <BlueFileInput 
                onChange={handleDocumentChange}
                type="text"
                className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1"
              />
              {errors.document && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800">{errors.document}</p>}
            </div>

            <input 
                type="submit"
                className={`w-full hover:bg-blue-700 active:bg-blue-800 py-3 text-white font-semibold mt-16 rounded-md cursor-pointer ${ isSubmitting ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600'}`}
                value={isSubmitting ? "Submitting..." : "Submit"}
                disabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default HLMIssuePenaltyPage;
