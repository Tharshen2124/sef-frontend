import { useNavigate, useParams } from "react-router-dom";
import AdminNavigationBar from "../../components/Admin/AdminNavigationBar";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import { getOperationHours } from "../../utils/getOperationHours";
import { formatTime } from "../../utils/time";
import useAuthStore from "../../store/useAuthStore";

export default function AdminUserMoreDetailsPage() {
    const { hawkerID } = useParams()
    const [user, setUser] = useState()
    const [applicationType, setApplicationType] = useState("Initial application")
    const { id, userType } = useAuthStore();
    const navigate = useNavigate();

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
                from("Hawker")
                .select(`
                    *,
                    User:userID (*),
                    LicenseApplication!inner(*),
                    BusinessInfo (*),
                    HawkerFinanceDetails (*)
                `)
                .eq("LicenseApplication.isAdminApproved", "Approved")
                .eq("LicenseApplication.status", "Approved")
                .eq("hawkerID", hawkerID)
                .single()
          setUser(data)
          console.log(data)
        }
        getData()
    }, [])

    useEffect(() => {

        if(user) {
            if(user.LicenseApplication[0].isRenew) {
                setApplicationType("Renewal")
            }
        }
       
    }, [user])

  return (
    <>
    <AdminNavigationBar />
    <section className="p-10">
            <div className="mb-5 text-[12px]">
                <a href="/admin/manage-user-accounts" className="text-blue-600 hover:underline">Manage Accounts</a>
                <span className="text-blue-600"> {">"} </span>
                <a href={`/admin/manage-user-accounts/${hawkerID}`} className="text-blue-600 hover:underline">More Info</a>
            </div>
            <div className="flex justify-between items-center">
                <h1 className="py-2 px-4 bg-[#DEE9FC] rounded-lg">
                    <span className="font-bold">Hawker Owner Name: </span> 
                    {user && user?.User.fullName}
                </h1>
            </div>  
            
            <h2 className="text-xl font-bold mt-6">Hawker Details</h2>
            <div className="mt-2 border border-[#e0e0e0] rounded-lg grid grid-cols-2 py-8 px-16">
                <div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Phone Number:</label>
                        <p className="text-[#555]">{user && user?.mobilePhoneNumber}</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Operation Hours:</label>
                        <p className="text-[#555]">{user && getOperationHours(user.BusinessInfo[0].businessStartTime, user.BusinessInfo[0].businessEndTime)}</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">IC Number:</label>
                        <p className="text-[#555]">{user && user.User.icNumber}</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Email:</label>
                        <p className="text-[#555]">{user && user.User.email}</p>
                    </div>
                </div>
                <div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Birth Date:</label>
                        <p className="text-[#555]">{user && user.birthDate}</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Gender:</label>
                        <p className="text-[#555]">{user && user.gender}</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Race:</label>
                        <p className="text-[#555]">{user && user.race}</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Hawker Photo:</label>
                        <p>
                            <a href={user && user.hawkerImage} className="text-blue-600 underline font-semibold">Photo Link</a>
                        </p>                    
                    </div>
                </div>
            </div>
            
            {/** LICENSE APPLICATION PART */}
            <h2 className="text-xl font-bold mt-6">License Application Details</h2>
            <div className="mt-2 border border-[#e0e0e0] rounded-lg grid grid-cols-2 py-8 px-16">
                <div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Type of Application:</label>
                        <p className="text-[#555]">{ applicationType }</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Bank Account Number:</label>
                        <p className="text-[#555]">{ user && user.HawkerFinanceDetails[0] && user.HawkerFinanceDetails[0].bankAccountNumber || "N/A"  }</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Bank Name:</label>
                        <p className="text-[#555]">{ user && user.HawkerFinanceDetails[0] && user.HawkerFinanceDetails[0].bankName || "N/A"  }</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Bank Holder Name:</label>
                        <p className="text-[#555]">{ user && user.HawkerFinanceDetails[0] && user.HawkerFinanceDetails[0].bankHolderName || "N/A" }</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Employment Status:</label>
                        <p className="text-[#555]">{ user && user.HawkerFinanceDetails[0] && user.HawkerFinanceDetails[0].employmentStatus || "N/A" }</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Household Income:</label>
                        <p className="text-[#555]">{ user && user.HawkerFinanceDetails[0] && user.HawkerFinanceDetails[0].householdIncome || "N/A" }</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Business Type:</label>
                        <p className="text-[#555]">{ user && user.HawkerFinanceDetails[0] && user.HawkerFinanceDetails[0].householdIncome || "N/A" }</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Business Start Time:</label>
                        <p className="text-[#555]">{ user && user.BusinessInfo[0] && formatTime(user.BusinessInfo[0].businessStartTime) || "N/A" }</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Contact Number:</label>
                        <p className="text-[#555]">{ user && user.HawkerFinanceDetails[0] && user.HawkerFinanceDetails[0].householdIncome || "N/A" }</p>
                    </div>
                </div>
                <div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Location Plan:</label>
                        <p className="text-[#555]">{ user && user.LicenseApplication[0].locationPlan }</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Passport Photo:</label>
                        <p>
                            <a href={user && user.LicenseApplication[0].passportPhoto} target="_blank" className="text-blue-600 underline font-semibold">Photo Link</a>
                        </p>                    
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Payment Proof {"(RM 1000)"}:</label>
                        <p>
                            <a href={user && user.LicenseApplication[0].paymentProof} target="_blank" className="text-blue-600 underline font-semibold">Proof Link</a>
                        </p>                    
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Food Handling Certificate:</label>
                        <p>
                            <a href={user && user.LicenseApplication[0].foodHandlingCertificate} target="_blank" className="text-blue-600 underline font-semibold">Certificate Link</a>
                        </p>       
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Typhoid Injection Card:</label>
                        <p>
                            <a href={user && user.LicenseApplication[0].typhoidInjectionCard} target="_blank" className="text-blue-600 underline font-semibold">Card Link</a>
                        </p>       
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Business Experience:</label>
                        <p className="text-[#555]">{ user && user.BusinessInfo[0] && user.BusinessInfo[0].businessExperience  || "N/A" }</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Food Type:</label>
                        <p className="text-[#555]">{ user && user.BusinessInfo[0] && user.BusinessInfo[0].foodType || "N/A" }</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Business End Time:</label>
                        <p className="text-[#555]">{ user && user.BusinessInfo[0] && formatTime(user.BusinessInfo[0].businessEndTime) || "N/A" }</p>
                    </div>
                </div>
            </div>
    </section>
    </>
  )
}
