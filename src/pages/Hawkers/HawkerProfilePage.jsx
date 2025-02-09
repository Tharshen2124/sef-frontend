import { Clock, MapPin, Phone, Store, User, Utensils } from 'lucide-react'
import HawkerNavigationBar from '../../components/Hawkers/HawkerNavigationBar'
import useAuthStore from '../../store/useAuthStore';
import { useEffect, useState } from 'react';

export default function HawkerProfilePage() {
  const { id, userType } = useAuthStore(); 
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
      if (userType !== 'hawker') {
          setShouldRedirect(true);
      }
  }, [id, userType]);  

  // useEffect(() => {
  //   async function getData() {
  //     const { data, error } = await supabase.from("Hawker")
  //   }
  // }, [])

  if (shouldRedirect) {
      return <Navigate to="/" replace />;
  } 

    return (
        <>
            <HawkerNavigationBar />
            <div 
                className="h-[400px] relative bg-cover bg-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${encodeURI(`/image.png`)})`
                }}
            >
                <div className="absolute bottom-0 left-0 p-10">
                    <div className="flex items-center gap-2 text-yellow-400 mb-2">
                        <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                        >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        <span className="text-xl font-medium text-white">4.5 Rating</span>
                    </div>
                    <h1 className="text-4xl font-bold text-white">
                        Hainiese Chicken Rice
                    </h1>
                </div>
                <a href="/hawker/profile/edit" className="absolute text-[14px] bottom-10 right-10 bg-blue-600 text-white px-10 py-4 rounded-[50px] font-medium hover:bg-blue-700 transition-colors">
                    Edit Profile
                </a>
            </div>

        <div className="mx-auto p-6 md:p-8">
        <div className="bg-white border border-[#e0e0e0] rounded-xl  p-6 grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Food Type */}
            <div className="flex gap-4 bg-[#F9FAFB] py-5 px-5 rounded-md">
              <Utensils className="w-6 h-6 text-gray-400 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900">Food Type</h3>
                <p className="text-gray-600">Chinese, Wok-fried dishes</p>
              </div>
            </div>

            {/* Hawker Type */}
            <div className="flex gap-4 bg-[#F9FAFB] py-5 px-5 rounded-md">
              <Store className="w-6 h-6 text-gray-400 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900">Hawker Type</h3>
                <p className="text-gray-600">Private Hawker Center</p>
              </div>
            </div>

            {/* Address */}
            <div className="flex gap-4 bg-[#F9FAFB] py-5 px-5 rounded-md">
              <MapPin className="w-6 h-6 text-gray-400 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900">Address</h3>
                <p className="text-gray-600">No.1 Jalan SP 10/5, Bandar Saujana Putra, 42610 Jenjarom, Selangor</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Operation Hours */}
            <div className="flex gap-4 bg-[#F9FAFB] py-5 px-5 rounded-md">
              <Clock className="w-6 h-6 text-gray-400 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900">Operation Hours</h3>
                <p className="text-gray-600">10:00 AM - 10:00 PM</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4 bg-[#F9FAFB] py-5 px-5 rounded-md">
              <Phone className="w-6 h-6 text-gray-400 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900">Phone</h3>
                <p className="text-gray-600">+60105567890</p>
              </div>
            </div>

            {/* Hawker Owner */}
            <div className="flex gap-4 bg-[#F9FAFB] py-5 px-5 rounded-md">
              <User className="w-6 h-6 text-gray-400 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900">Hawker Owner</h3>
                <p className="text-gray-600">Vincent Lim</p>
              </div>
            </div>
          </div>
        </div>
      </div>
        </>
    )
}
