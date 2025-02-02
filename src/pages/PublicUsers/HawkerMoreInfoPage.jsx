import React, { useEffect, useState } from 'react';
import NavigationBar from '../../components/PublicUsers/NavigationBar';
import { Clock, MapPin, Phone, Store, User, Utensils } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient';
import useAuthStore from '../../store/useAuthStore';

export default function HawkerMoreInfoPage() {
    const [info, setInfo] = useState(null); // Stores hawker data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const { hawkerID } = useParams();
    const { id, userType } = useAuthStore(); 
    const [shouldRedirect, setShouldRedirect] = useState(false);
  
    useEffect(() => {
        if (userType !== 'publicuser') {
            setShouldRedirect(true);
        }
    }, [id, userType]);  
  
    if (shouldRedirect) {
        return <Navigate to="/" replace />;
    } 
  

    console.log(hawkerID);

    useEffect(() => {
        async function getData() {
            try {
                setLoading(true); // Start loading
                const { data, error } = await supabase
                    .from('Hawker')
                    .select(`
                      *,
                      User(*)
                    `)
                    .eq('hawkerID', hawkerID)
                    .single();

                if (error) {
                    throw new Error(error.message); // Throw error for easier handling
                }
                console.log(data)
                setInfo(data); // Set hawker data
            } catch (err) {
                setError(err.message); // Capture and set error
            } finally {
                setLoading(false); // Stop loading
            }
        }

        getData();
    }, [hawkerID]);

    if (loading) {
        return (
            <>
                <NavigationBar />
                <p className="text-center text-gray-500 mt-10">Loading hawker details...</p>
            </>
        );
    }

    if (error) {
        return (
            <>
                <NavigationBar />
                <p className="text-center text-red-600 mt-10">Error: {error}</p>
            </>
        );
    }

    if (!info) {
        return (
            <>
                <NavigationBar />
                <p className="text-center text-gray-500 mt-10">Hawker not found.</p>
            </>
        );
    }

    return (
        <>
            <NavigationBar />
            <div
                className="h-[400px] relative bg-cover bg-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${encodeURI('/image.png')})`,
                }}
            >
                <div className="absolute bottom-0 left-0 p-10">
                    <div className="flex items-center gap-2 text-yellow-400 mb-2">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        <span className="text-xl font-medium text-white">4.5 Rating</span>
                    </div>
                    <h1 className="text-4xl font-bold text-white">{info.businessName || 'N/A'}</h1>
                </div>
                <button className="absolute text-[14px] bottom-10 right-10 bg-blue-600 text-white px-10 py-4 rounded-[50px] font-medium hover:bg-blue-700 transition-colors">
                    Submit Feedback
                </button>
            </div>

            <div className="mx-auto p-6 md:p-8">
                <div className="bg-white border border-[#e0e0e0] rounded-xl p-6 grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="flex gap-4 bg-[#F9FAFB] py-5 px-5 rounded-md">
                            <Utensils className="w-6 h-6 text-gray-400 flex-shrink-0" />
                            <div>
                                <h3 className="font-medium text-gray-900">Food Type</h3>
                                <p className="text-gray-600">{info.foodType || 'N/A'}</p>
                            </div>
                        </div>

                        <div className="flex gap-4 bg-[#F9FAFB] py-5 px-5 rounded-md">
                            <Store className="w-6 h-6 text-gray-400 flex-shrink-0" />
                            <div>
                                <h3 className="font-medium text-gray-900">Hawker Type</h3>
                                <p className="text-gray-600">{info.hawkerType || 'N/A'}</p>
                            </div>
                        </div>

                        <div className="flex gap-4 bg-[#F9FAFB] py-5 px-5 rounded-md">
                            <MapPin className="w-6 h-6 text-gray-400 flex-shrink-0" />
                            <div>
                                <h3 className="font-medium text-gray-900">Address</h3>
                                <p className="text-gray-600">{info.contactAddress || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex gap-4 bg-[#F9FAFB] py-5 px-5 rounded-md">
                            <Clock className="w-6 h-6 text-gray-400 flex-shrink-0" />
                            <div>
                                <h3 className="font-medium text-gray-900">Operation Hours</h3>
                                <p className="text-gray-600">{info.operationHours || 'N/A'}</p>
                            </div>
                        </div>

                        <div className="flex gap-4 bg-[#F9FAFB] py-5 px-5 rounded-md">
                            <Phone className="w-6 h-6 text-gray-400 flex-shrink-0" />
                            <div>
                                <h3 className="font-medium text-gray-900">Phone</h3>
                                <p className="text-gray-600">{info.mobilePhoneNumber || 'N/A'}</p>
                            </div>
                        </div>

                        <div className="flex gap-4 bg-[#F9FAFB] py-5 px-5 rounded-md">
                            <User className="w-6 h-6 text-gray-400 flex-shrink-0" />
                            <div>
                                <h3 className="font-medium text-gray-900">Hawker Owner</h3>
                                <p className="text-gray-600">{info.User.fullName || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
