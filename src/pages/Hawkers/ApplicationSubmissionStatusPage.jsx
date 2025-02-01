import { useEffect, useState } from 'react';
import NavigationBar from '../../components/PublicUsers/NavigationBar'
import useAuthStore from '../../store/useAuthStore';

export default function ApplicationSubmissionStatusPage() {
  const { id, userType } = useAuthStore(); 
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
      if (userType !== 'hawker') {
          setShouldRedirect(true);
      }
  }, [id, userType]);  

  if (shouldRedirect) {
      return <Navigate to="/" replace />;
  } 

  const feedbackItems = [
    {
      businessName: "User spamming in forum posts",
      ownerName: "Aiden Chan Kai Ming",
      foodType: "cuisine",
      status: "Under Review",
    },
    {
      title: "False News",
      ownerName: "Aiden Chan Kai Ming",
      foodType: "cuisine",
      status: "Rejected",
    },
  ]

  return (
    <>
        <NavigationBar />
        <div className="w-full p-10 mx-auto">
        <h1 className="text-3xl font-bold mb-6">Application Submission Status</h1>
        <table className="w-full">
            <thead>
            <tr className="text-left border-b border-[#999]">
                <th className="py-2 w-[250px]">Hawker Business Name</th>
                <th className="py-2 w-[600px] sm:pl-16 md:pl-24">Owner Name</th>
                <th className="py-2 sm:pl-16 md:pl-24">Food Type</th>
                <th className="py-2">Status</th> 
                <th className="py-2 w-[100px]"></th>
            </tr>
            </thead>
            <tbody>
            {feedbackItems.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                <td className="py-4">{item.title}</td>
                <td className="py-6 sm:pl-16 md:pl-24">{item.ownerName}</td>
                <td className="py-4 sm:pl-16 md:pl-24">{item.foodType}</td>
                <td className="py-4">{item.status}</td>
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
        </table>
        </div>
    </>
  )
}

