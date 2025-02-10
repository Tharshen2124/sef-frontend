
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../utils/supabaseClient";
import NavigationBar from "../../components/Hawkers/HawkerNavigationBar";
import useAuthStore from '../../store/useAuthStore';
import { Link } from "react-router-dom";

export default function ApplicationSubmissionStatusPage() {
    const { id, userType } = useAuthStore(); 
    const navigate = useNavigate()
    const [applicationSubmissions, setApplicationSubmissions] =useState([]);

    useEffect(() => {
        if (id && id !== "0" && userType === 'hawker') {
            // User is authorized; no action needed
            return;
        } else {
            // User is not authorized; show alert and redirect
            alert("You are not authorized to view this page! Only hawkers are allowed to view this page.");
            navigate('/');
        }
    }, [id, userType]);

    useEffect(() => {
        async function getData() {
        const { data, error } = await supabase
        .from("LicenseApplication")
        .select(`
            status,
            licenseApplicationID,
            isRenew,
            locationPlan,
            Hawker:hawkerID (
                User:userID ( fullName ),
                BusinessInfo ( businessName, foodType )
            )
        `)
        .eq("hawkerID", id)

        console.log("Data:", data);

        
        setApplicationSubmissions(data);
        console.log("Fetched data:", JSON.stringify(data, null, 2));
            
        }
        getData();
    }, []); 

  return (
    <>
        <NavigationBar />
        <div className="w-full p-10 mx-auto">
        <h1 className="text-3xl font-bold mb-6">Application Submission Status</h1>
        {applicationSubmissions ? (
            <table className="w-full">
                <thead>
                <tr className="text-left border-b border-[#999]">
                    <th className="py-2 w-[250px]">Owner Name</th>
                    <th className="py-2 sm:pl-16 md:pl-24">Application Type</th>
                    <th className="py-2">Status</th> 
                    <th className="py-2 w-[100px]"></th>
                </tr>
                </thead>
                <tbody>
                {applicationSubmissions && applicationSubmissions.map((item, index) =>
                <tr key={index} className="border-b border-gray-200">
                    <td className="py-6">{item?.Hawker?.User?.fullName || "N/A"}</td>
                    <td className="py-4 sm:pl-16 md:pl-24">{item?.isRenew ? "License Renewal" : "License Approval" || "N/A"}</td>
                    <td className={`py-4
                        ${item?.status === "Under Review" ? "text-yellow-600" : ""}
                        ${item?.status === "Rejected" ? "text-red-500" : ""}
                        ${item?.status === "Approved" ? "text-green-500" : ""}`
                    }>
                        {item?.status || "N/A"}
                    </td>

                    <td className="py-4">
                        <Link to={`/hawker/application-submissions-status/${item.licenseApplicationID}`} className="text-blue-600 hover:text-blue-800 underline">
                            More Details
                        </Link>
                    </td>
                </tr>
                )}
                </tbody>
            </table>  
        ) : (
            <p class="text-center bg-slate-100 border-2 border-slate-500 py-2 text-slate-700 rounded-md">No submissions have been made.</p>
        )}
        </div>
    </>
  )
}

