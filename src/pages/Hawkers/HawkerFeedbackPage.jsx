import { useEffect, useState } from 'react';
import NavigationBar from "../../components/Hawkers/HawkerNavigationBar";
import useAuthStore from '../../store/useAuthStore';
import { supabase } from '../../utils/supabaseClient';
import { Navigate, useNavigate } from 'react-router-dom';

export default function HawkerFeedbackPage() {
  const { id, userType } = useAuthStore(); //get user's id and user type
  const [feedbackItems, setFeedbackItems] = useState([]); //get feedback
  const [loading, setLoading] = useState(true); //loading state
  const [error, setError] = useState(null); //error state
  const navigate = useNavigate()
  
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

  //fetch data from supabase
  useEffect(() => {
    async function getData() {
      setLoading(true);
      setError(null); // Reset error state before fetching data

      //queries Feedback table
      //join PublicUser table and User table to get user details
      //join Feedback table to get feedback details by hawkerID
      const { data, error } = await supabase
        .from("Feedback")
        .select(`
          *,
          PublicUser!inner (
            *,
            User!inner (*)
          )
        `)
        .eq("hawkerID", id);

      if (error) {
        setError(error.message);
      } else {
        setFeedbackItems(data);
      }
      setLoading(false);
    }

    if (id) {
      getData();
    }
  }, [id]);

  return (
    <>
    {/* Display feedback*/}
      <NavigationBar />
      <div className="w-full p-10 mx-auto">
        <h1 className="text-3xl font-bold mb-6">Feedback</h1>

        {/* Show loading state */}
        {loading && <p className="text-center text-gray-500">Loading feedback...</p>}

        {/* Show error message */}
        {error && (
          <p className="text-center text-red-600">
            Error fetching feedback: {error}
          </p>
        )}

        {/* Show no data message */}
        {!loading && !error && feedbackItems.length === 0 && (
           <p class="text-center bg-slate-100 border-2 border-slate-500 py-2 text-slate-700 rounded-md">No feedbacks have been made to you.</p>
        )}

        {/* Render feedback table */}
        {!loading && !error && feedbackItems.length > 0 && (
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-[#999]">
                <th className="py-2 w-[250px]">Title</th>
                <th className="py-2 w-[600px] sm:pl-16 md:pl-24 lg:pl-32 xl:pl-48">
                  Description
                </th>
                <th className="py-2 sm:pl-16 md:pl-24 lg:pl-32 xl:pl-48">Made by</th>
                <th className="py-2 w-[100px]"></th>
              </tr>
            </thead>
            <tbody>
              {feedbackItems.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-4">{item.feedbackTitle}</td>
                  <td className="py-6 sm:pl-16 md:pl-24 lg:pl-32 xl:pl-48">
                    {item.feedbackDescription}
                  </td>
                  <td className="py-4 sm:pl-16 md:pl-24 xl:pl-48">
                    {item.PublicUser?.User?.fullName || 'Unknown User'}
                  </td>
                  <td className="py-4">
                    <a
                      href={`/hawker/feedback/${item.feedbackID}`}
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      More Details
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
