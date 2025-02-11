import AdminNavigationBar from "../../components/Admin/AdminNavigationBar";
import hawkerApplication from "../../assets/hawkerApplication.svg"
import userAccounts from "../../assets/userAccounts.svg"
import useAuthStore from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AdminDashboardPage() {
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
    
  return (
    <>
        <AdminNavigationBar />
        <section className="p-10">
            <h1 className="text-[24px] font-bold text-center">Dashboard</h1>
            <div className="flex justify-center gap-x-4 mt-10">
                <a href="/admin/hawker-applications" className="w-[340px] border border-blue-200 px-16 py-[90px] rounded-lg hover:border-blue-600 hover:outline hover:outline-blue-600 transition">
                    <img src={hawkerApplication} alt="" className="mx-auto"/>
                    <h2 className="text-blue-600 font-semibold text-lg text-center mt-10">Hawker Application</h2>
                </a>
                <a href="/admin/manage-user-accounts" className="w-[340px] border border-blue-200 px-16 py-[90px] rounded-lg hover:border-blue-600 hover:outline hover:outline-blue-600 transition">
                    <img src={userAccounts} alt="" className="mx-auto"/>
                    <h2 className="text-blue-600 font-semibold text-lg text-center mt-10">Manage User Accounts</h2>
                </a>
            </div>
        </section>
    </>
  )
}
