import { useEffect, useState } from "react"
import AdminNavigationBar from "../../components/Admin/AdminNavigationBar"
import { supabase } from "../../utils/supabaseClient"
import { useNavigate } from "react-router-dom"

export default function HawkerApplicationReviewPage() {
  const [applications, setApplications] = useState()
  const navigate = useNavigate()

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
  return (
    <>
        <AdminNavigationBar />
        <section className="p-10 mt-10">
        <h1 className="text-2xl font-bold mb-3">Hawker License Application</h1>
        <div className="w-full mx-auto border rounded-lg border-[#e0e0e0] py-16 px-24">
        <table className="w-full">
            <thead>
            <tr className="text-left border-b border-[#999]">
                <th className="py-2 w-[250px]">Hawker Name</th>
                <th className="py-2 w-[600px] sm:pl-16 md:pl-24 lg:pl-32 xl:pl-48">Contact Number</th>
                <th className="py-2 sm:pl-8 lg:pl-4">Food Type</th>
                <th className="py-2 w-[100px]"></th>
            </tr>
            </thead>
            <tbody>
            {applications && applications.map((item, index) => (
                <tr key={index} className="border-b border-[#e0e0e0]">
                <td className="py-4">{item.Hawker.BusinessInfo[0].businessName}</td>
                <td className="py-6 sm:pl-16 md:pl-24 lg:pl-32 xl:pl-48">{item.Hawker.mobilePhoneNumber}</td>
                <td className="py-4 sm:pl-8 lg:pl-4">{item.Hawker.BusinessInfo[0].foodType}</td>
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
        </section>
        
    </>
  )
}
