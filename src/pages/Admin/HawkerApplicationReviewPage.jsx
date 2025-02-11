import { useEffect, useState } from "react"
import AdminNavigationBar from "../../components/Admin/AdminNavigationBar"
import { supabase } from "../../utils/supabaseClient"
import { useNavigate } from "react-router-dom"
import useAuthStore from "../../store/useAuthStore"

export default function HawkerApplicationReviewPage() {
  const [applications, setApplications] = useState()
  const navigate = useNavigate()
  const { id, userType } = useAuthStore();

  useEffect(() => {
    if (id && id !== "0" && userType === 'admin') {
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
      const { data, error } = await supabase.
        from("LicenseApplication")
        .select(`
          licenseApplicationID,
          Hawker:hawkerID (
            hawkerID, mobilePhoneNumber,
            BusinessInfo (businessName, foodType)
          )
        `)
        .eq("isAdminApproved", "Under Review")
        .eq("status", "Under Review")
      setApplications(data)
    }

    getData()
  }, [])

  async function handleAccept(licenseApplicationID) {
    const { error } = await supabase
      .from("LicenseApplication")
      .update({
        isAdminApproved: "Approved"
      })
      .eq("licenseApplicationID", licenseApplicationID)
    
    if (error) {
      alert("Error occured")
      console.log("error occured",  error.message)
    } else {
      alert("Succesfully updated status of license application")
      console.log("Status for license application successfully updated")
      navigate(0)
    }
  }

  async function handleReject(licenseApplicationID) {
    const { error } = await supabase
    .from("LicenseApplication")
    .update({
      isAdminApproved: "Rejected"
    })
    .eq("licenseApplicationID", licenseApplicationID)
  
    if (error) {
      alert("Error occured, there's a problem updating the status for the application.")
      console.log("error occured",  error.message)
    } else {
      alert("Succesfully updated status of license application")
      console.log("Status for license application successfully updated")
      navigate(0)
    }
  }

  console.log(applications)

  console.log(applications)
  return (
    <>
        <AdminNavigationBar />
        <section className="p-10 mt-10">
        <h1 className="text-2xl font-bold mb-3">Hawker License Application</h1>
        { applications && applications.length !== 0 && (
        <div className="w-full mx-auto border rounded-lg border-[#e0e0e0] py-16 px-24">
       
          <table className="w-full">
            <thead>
            <tr className="text-left border-b border-[#999]">
                <th className="py-2 w-[250px]">Hawker Name</th>
                <th className="py-2 w-[400px] sm:pl-16 md:pl-24">Contact Number</th>
                <th className="py-2 ">Food Type</th>
                <th className="py-2 w-[100px]"></th>
            </tr>
            </thead>
            <tbody>
            {applications && applications.map((item, index) => (
                <tr key={index} className="border-b border-[#e0e0e0]">
                <td className="py-4">{item.Hawker.BusinessInfo[0].businessName}</td>
                <td className="py-6 sm:pl-16 md:pl-24">{item.Hawker.mobilePhoneNumber}</td>
                <td className="py-4 ">{item.Hawker.BusinessInfo[0].foodType}</td>
                <td className="py-4 flex gap-x-4 items-center">
                    <a 
                    href={`/admin/hawker-applications/${item.licenseApplicationID}`}
                    className="text-blue-600 hover:text-blue-800 underline w-[91px] mr-8"
                    >
                    More Details
                    </a>
                    <button className="py-[10px] px-6 bg-green-500 text-white rounded-md" onClick={() => handleAccept(item.licenseApplicationID)}>Accept</button>
                    <button className="py-[10px] px-6 bg-red-500 text-white rounded-md" onClick={() => handleReject(item.licenseApplicationID)}>Reject</button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
        )}
        
        {applications && applications.length === 0 && (
            <p class="text-center bg-slate-100 border-2 border-slate-500 py-2 text-slate-700 rounded-md">
            No license applications or renewals for now. Check back later.</p>
        )}
        </section>
        
    </>
  )
}
