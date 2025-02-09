
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { supabase } from "../../utils/supabaseClient";
import NavigationBar from "../../components/Hawkers/HawkerNavigationBar";
import useAuthStore from '../../store/useAuthStore';
import { Link } from "react-router-dom";

export default function ApplicationSubmissionStatusPage() {
  const { id, userType } = useAuthStore(); 
  const [shouldRedirect, setShouldRedirect] = useState(false);

  /*
  useEffect(() => {
      if (userType !== 'hawker') {
          setShouldRedirect(true);
      }
  }, [id, userType]);  

  if (shouldRedirect) {
      return <Navigate to="/" replace />;
  } 
*/

    const {hawkerID}=useParams();
    const [feedbacks, setFeedbacks] =useState([]);

useEffect(() => {
    async function getData() {
      const { data, error } = await supabase
      .from("LicenseApplication")
      .select(`
          status,
          licenseApplicationID,
          Hawker:hawkerID (
              User:userID ( fullName ),
              BusinessInfo ( businessName, foodType )
          )
      `)
      .eq("hawkerID", hawkerID)

      
      setFeedbacks(data);
      console.log("Fetched data:", JSON.stringify(data, null, 2));
        
    }
    getData();
}, [hawkerID]); 

  return (
    <>
        <NavigationBar />
        <div className="w-full p-10 mx-auto">
        <h1 className="text-3xl font-bold mb-6">Application Submission Status</h1>
        <table className="w-full">
            <thead>
            <tr className="text-left border-b border-[#999]">
                <th className="py-2 w-[250px]">Hawker Business Name</th>
                <th className="py-2 w-[600px] sm:pl-16 md:pl-24">Owner Name</th>
                <th className="py-2 sm:pl-16 md:pl-24">Food Type</th>
                <th className="py-2">Status</th> 
                <th className="py-2 w-[100px]"></th>
            </tr>
            </thead>
            <tbody>
            {feedbacks.map((item, index) =>
              <tr key={index} className="border-b border-gray-200">
                  <td className="py-4">{item?.Hawker?.BusinessInfo?.[0]?.businessName || "N/A"}</td>
                  <td className="py-6 sm:pl-16 md:pl-24">{item?.Hawker?.User?.fullName || "N/A"}</td>
                  <td className="py-4 sm:pl-16 md:pl-24">{item?.Hawker?.BusinessInfo?.[0]?.foodType || "N/A"}</td>
                  <td className="py-4">{item?.status || "N/A"}</td>
                  <td className="py-4">
                      <Link to={`/hawker/application-more-info/${hawkerID}/${item.licenseApplicationID}`} className="text-blue-600 hover:text-blue-800 underline">
                          More Details
                      </Link>
                  </td>
              </tr>
            )}
            </tbody>
        </table>
        </div>
    </>
  )
}

