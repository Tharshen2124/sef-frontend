import { useNavigate, useParams } from "react-router-dom";
import AdminNavigationBar from "../../components/Admin/AdminNavigationBar";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import { formatTime } from "../../utils/time";

export default function HawkerApplicationReviewMoreDetailsPage() {
    const { hawkerID } = useParams()
    const [application, setApplication] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        async function getData() {
            const { data, error } = await supabase
                .from("LicenseApplication")
                .select(`
                    *,
                    Hawker:hawkerID (
                        *,
                        BusinessInfo (*),
                        HawkerFinanceDetails (*),
                        User:userID (*)
                    )
                `)
                .eq("licenseApplicationID", hawkerID) 
                .eq("isAdminApproved", "Under Review")
                .single(); 
          setApplication(data)
          console.log(data)
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
          navigate("/admin/hawker-applications")
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
          navigate("/admin/hawker-applications")
        }
      }

  return (
    <>
    <AdminNavigationBar />
    <section className="p-10">
            <div className="mb-5 text-[12px]">
                <a href="" className="text-blue-600 hover:underline">Hawker Application</a>
                <span className="text-blue-600"> {">"} </span>
                <a href="" className="text-blue-600 hover:underline">More Details</a>
            </div>
            <div className="flex justify-between items-center">
                <h1 className="py-2 px-4 bg-[#DEE9FC] rounded-lg">
                    <span className="font-bold">Hawker Business Name: </span> 
                    {application && application.Hawker.BusinessInfo[0].businessName}
                </h1>
                <div className="flex items-center gap-x-2">
                    <button onClick={() => handleAccept(application.licenseApplicationID)} className="py-[10px] px-8 bg-green-500 text-white rounded-md">Accept</button>
                    <button onClick={() => handleReject(application.licenseApplicationID)}  className="py-[10px] px-8 bg-red-500 text-white rounded-md">Reject</button>
                </div>
            </div>  
            <div className="mt-4 border border-[#e0e0e0] rounded-lg grid grid-cols-2 py-8 px-16">
                <div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Type of Application:</label>
                        <p className="text-[#555]">Initial application</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Bank Account Number:</label>
                        <p className="text-[#555]">{application && application.Hawker.HawkerFinanceDetails[0].bankAccountNumber}</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Bank Name:</label>
                        <p className="text-[#555]">{application && application.Hawker.HawkerFinanceDetails[0].bankName}</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Bank Holder Name:</label>
                        <p className="text-[#555]">{application && application.Hawker.HawkerFinanceDetails[0].bankHolderName }</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Employment Status:</label>
                        <p className="text-[#555]">{application && application.Hawker.HawkerFinanceDetails[0].employmentStatus}</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Household Income:</label>
                        <p className="text-[#555]">{application && application.Hawker.HawkerFinanceDetails[0].householdIncome}n</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Owner Name:</label>
                        <p className="text-[#555]">{application && application.Hawker.User.fullName}</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Business Type:</label>
                        <p className="text-[#555]">{application && application.Hawker.BusinessInfo[0].businessType}</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Business Start Time:</label>
                        <p className="text-[#555]">{application && formatTime(application.Hawker.BusinessInfo[0].businessStartTime)}</p>
                    </div>
                </div>
                <div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Location Plan:</label>
                        <p className="text-[#555]">{application && application.locationPlan}</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Passport Photo:</label>
                        <p>
                            <a href={application && application.passportPhoto} target="_blank" className="text-blue-600 underline font-semibold">Initial application</a>
                        </p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Payment Proof {"(RM 1000)"}</label>
                        <p>
                            <a href={application && application.paymentProof} target="_blank" className="text-blue-600 underline font-semibold">Proof Link</a>
                        </p>                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Food Handling Certificate: </label>
                        <p>
                            <a href={application && application.foodHandlingCertificate} target="_blank" className="text-blue-600 underline font-semibold">Certificate Link</a>
                        </p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Typhoid Injection Card:</label>
                        <p>
                            <a href={application && application.typhoidInjectionCard} target="_blank" className="text-blue-600 underline font-semibold">Card Link</a>
                        </p>                    
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Business Experience</label>
                        <p className="text-[#555]">{application && application.Hawker.BusinessInfo[0].businessExperience}</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Food Type:</label>
                        <p className="text-[#555]">{application && application.Hawker.BusinessInfo[0].foodType}</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Business End TIme:</label>
                        <p className="text-[#555]">{application && formatTime(application.Hawker.BusinessInfo[0].businessEndTime)}</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Contact Number:</label>
                        <p className="text-[#555]">{application && application.Hawker.mobilePhoneNumber}</p>
                    </div>
                </div>
            </div>
    </section>
    </>
  )
}
