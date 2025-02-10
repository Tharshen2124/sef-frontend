
import NavigationBar from "../../components/Hawkers/HawkerNavigationBar";
import Feedback from "../../assets/Feedback.svg"
import License from "../../assets/licenseIcon.svg"
import Penalties from "../../assets/Penalties.svg"
import Profile from "../../assets/profile.svg"
import appSubStatus from "../../assets/appSubStatus.svg"
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import { useEffect, useState } from "react";

export default function HawkerDashboardPage() {
    const { id, userType } = useAuthStore(); 
    const navigate = useNavigate();

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
   
  return (
    <>
        <NavigationBar />
        <section className="p-10">
            <h1 className="text-[24px] font-bold text-center">Dashboard</h1>
            <div className="flex flex-wrap justify-center gap-4 mt-10 max-w-[1200px] mx-auto">
                <a href="/hawker/profile" className="w-[340px] border border-blue-200 px-16 py-[50px] rounded-lg hover:border-blue-600 hover:outline hover:outline-blue-600 transition">
                    <img src={Profile} alt="" className="mx-auto"/>
                    <h2 className="text-blue-600 font-semibold text-lg text-center mt-10">Profile</h2>
                </a>
                <a href="/hawker/feedback" className="w-[340px] border border-blue-200 px-16 py-[50px] rounded-lg hover:border-blue-600 hover:outline hover:outline-blue-600 transition">
                    <img src={Feedback} alt="" className="mx-auto"/>
                    <h2 className="text-blue-600 font-semibold text-lg text-center mt-10">Feedback</h2>
                </a>
                <a href="/hawker/apply-license" className="w-[340px] border border-blue-200 px-16 py-[50px] rounded-lg hover:border-blue-600 hover:outline hover:outline-blue-600 transition">
                    <img src={License} alt="" className="mx-auto"/>
                    <h2 className="text-blue-600 font-semibold text-lg text-center mt-10">Apply License</h2>
                </a>
                <a href="/hawker/view-penalty" className="w-[340px] border border-blue-200 px-6 py-[50px] rounded-lg hover:border-blue-600 hover:outline hover:outline-blue-600 transition">
                    <img src={Penalties} alt="" className="mx-auto"/>
                    <h2 className="text-blue-600 font-semibold text-lg text-center mt-10">Penalties</h2>
                </a>
                <a href="/hawker/renew-license" className="w-[340px] border border-blue-200 px-16 py-[50px] rounded-lg hover:border-blue-600 hover:outline hover:outline-blue-600 transition">
                    <img src={License} alt="" className="mx-auto"/>
                    <h2 className="text-blue-600 font-semibold text-lg text-center mt-10">Renew License</h2>
                </a>
                <a href="/hawker/application-submissions-status" className="w-[340px] border border-blue-200 px-16 py-[50px] rounded-lg hover:border-blue-600 hover:outline hover:outline-blue-600 transition">
                    <img src={appSubStatus} alt="" className="mx-auto w-64"/>
                    <h2 className="text-blue-600 font-semibold text-md text-center mt-10">Application Submission Status</h2>
                </a>
            </div>
        </section>
    </>
  )
}
