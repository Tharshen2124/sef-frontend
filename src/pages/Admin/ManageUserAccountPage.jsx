import { useEffect, useState } from "react"
import AdminNavigationBar from "../../components/Admin/AdminNavigationBar"
import { supabase } from "../../utils/supabaseClient"
import { useNavigate } from "react-router-dom"
import useAuthStore from "../../store/useAuthStore"

export default function ManageUserAccountPage() {
  const [users, setUsers] = useState()
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
              from("Hawker")
              .select(`
                *,
                User:userID (*),
                LicenseApplication!inner(status)
              `)
              .eq("LicenseApplication.status", "Approved");
        setUsers(data)
        console.log(data)
      }
      getData()
    }, [])

    async function handleDelete(hawkerID, userID) {
      const isConfirm = confirm("Are you sure you want to delete this user?");

      if (!isConfirm) return;

      try {
        // Step 1: Delete Feedback related to the Hawker
        const { error: feedbackError } = await supabase
          .from("Feedback")
          .delete()
          .eq("hawkerID", hawkerID);
        
        if (feedbackError) throw new Error("Error deleting Feedback: " + feedbackError.message);

        // Step 2: Delete Penalty related to the Hawker
        const { error: penaltyError } = await supabase
          .from("Penalty")
          .delete()
          .eq("hawkerID", hawkerID);
        
        if (penaltyError) throw new Error("Error deleting Penalty: " + penaltyError.message);

        // Step 3: Delete LicenseApplications related to the Hawker
        const { error: licenseError } = await supabase
          .from("LicenseApplication")
          .delete()
          .eq("hawkerID", hawkerID);

        if (licenseError) throw new Error("Error deleting License Applications: " + licenseError.message);

        // Step 4: Delete HawkerFinanceDetails related to the Hawker
        const { error: financeError } = await supabase
          .from("HawkerFinanceDetails")
          .delete()
          .eq("hawkerID", hawkerID);

        if (financeError) throw new Error("Error deleting Hawker Finance Details: " + financeError.message);

        // Step 5: Delete BusinessInfo related to the Hawker
        const { error: businessError } = await supabase
          .from("BusinessInfo")
          .delete()
          .eq("hawkerID", hawkerID);

        if (businessError) throw new Error("Error deleting Business Info: " + businessError.message);

        // Step 6: Delete Hawker record
        const { error: hawkerError } = await supabase
          .from("Hawker")
          .delete()
          .eq("hawkerID", hawkerID);

        if (hawkerError) throw new Error("Error deleting Hawker: " + hawkerError.message);

        // Step 7: Delete Hawker record
        const { error: userError } = await supabase
        .from("User")
        .delete()
        .eq("userId", userID);
  
        if (userError) throw new Error("Error deleting User: " + userError.message);

        alert("Successfully deleted the hawker and all related data.");
        console.log("Successfully deleted hawker, user, and related records.");
        navigate(0);

      } catch (error) {
        alert(error.message);
        console.error(error.message);
      }
    }

    
    return (
    <>
        <AdminNavigationBar />
          <section className="p-10 mt-10">
            <h1 className="text-2xl font-bold mb-3">Manage User Accounts</h1>
            {users && users.length !== 0 && (
              <div className="w-full mx-auto border rounded-lg border-[#e0e0e0] py-16 px-24">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-[#999]">
                        <th className="py-2 w-[200px]">Full Name</th>
                        <th className="py-2 w-[500px] sm:pl-16 md:pl-24 lg:pl-32 xl:pl-48">Email</th>
                        <th className="py-2 sm:pl-8 lg:pl-4">Contact Number</th>
                        <th className="py-2 w-[100px]"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users && users.map((item, index) => (
                        <tr key={index} className="border-b border-[#e0e0e0]">
                        <td className="py-4">{item.User.fullName}</td>
                        <td className="py-6 sm:pl-16 md:pl-24 lg:pl-32 xl:pl-48">{item.User.email}</td>
                        <td className="py-4 sm:pl-8 lg:pl-4">{item.mobilePhoneNumber}</td>
                        <td className="py-4 flex gap-x-4 items-center">
                            <a 
                            href={`/admin/manage-user-accounts/${item.hawkerID}`} 
                            className="text-blue-600 hover:text-blue-800 underline w-[91px] mr-8"
                            >
                            More Details
                            </a>
                            <a href={`/admin/users/edit/${item.hawkerID}`} className="py-[10px] px-10 bg-blue-600 text-white rounded-md">Edit</a>
                            <button onClick={() => handleDelete(item.hawkerID, item.User.userId)} className="py-[10px] px-8 bg-red-500 text-white rounded-md">Delete</button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
          )}

          {users && users.length === 0 && (
            <p class="text-center bg-slate-100 border-2 border-slate-500 py-2 text-slate-700 rounded-md">No license applications or renewals for now. Check back later.</p>
          )}
        </section>
    </>
  )
}
