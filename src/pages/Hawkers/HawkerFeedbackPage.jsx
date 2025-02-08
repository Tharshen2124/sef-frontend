import { useEffect, useState } from 'react';
import NavigationBar from "../../components/Hawkers/HawkerNavigationBar";
import useAuthStore from '../../store/useAuthStore';
import { supabase } from '../../utils/supabaseClient';
import { Navigate } from 'react-router-dom';

export default function HawkerFeedbackPage() {
  const { id, userType } = useAuthStore(); 
  const [shouldRedirect, setShouldRedirect] = useState(false);

  // SELECT * FROM FEEDBACK WHERE 

  useEffect(() => {
      if (userType !== 'hawker') {
          setShouldRedirect(true);
      }
      
  }, [id, userType]);  

  useEffect(() => {
    async function getData() {
      const { data, error } = await supabase
        .from("User")
        .select()

      console.log(data)
    }  

    getData()
  }, [])

  if (shouldRedirect) {
      return <Navigate to="/" replace />;
  } 

  return (
    <>
        <NavigationBar />
        <div className="w-full p-10 mx-auto">
        <h1 className="text-3xl font-bold mb-6">Feedback</h1>
        {/* <table className="w-full">
            <thead>
            <tr className="text-left border-b border-[#999]">
                <th className="py-2 w-[250px]">Title</th>
                <th className="py-2 w-[600px] sm:pl-16 md:pl-24 lg:pl-32 xl:pl-48">Description</th>
                <th className="py-2 sm:pl-16 md:pl-24 lg:pl-32 xl:pl-48">Made by</th>
                <th className="py-2 w-[100px]"></th>
            </tr>
            </thead>
            <tbody>
            {feedbackItems.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                <td className="py-4">{item.title}</td>
                <td className="py-6 sm:pl-16 md:pl-24 lg:pl-32 xl:pl-48">{item.description}</td>
                <td className="py-4 sm:pl-16 md:pl-24 xl:pl-48">{item.hawkerName}</td>
                <td className="py-4">
                    <a 
                    href="#" 
                    className="text-blue-600 hover:text-blue-800 underline"
                    >
                    More Details
                    </a>
                </td>
                </tr>
            ))}
            </tbody>
        </table> */}
        </div>
    </>
  )
}
