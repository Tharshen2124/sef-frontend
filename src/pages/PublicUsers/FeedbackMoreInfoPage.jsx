import { useNavigate, useParams } from "react-router-dom";
import NavigationBar from "../../components/PublicUsers/NavigationBar";
import { useEffect, useState } from "react";
import { supabase } from '../../utils/supabaseClient';
import useAuthStore from "../../store/useAuthStore";

export default function FeedbackMoreInfoPage() {
    const [info, setInfo] = useState(null); // Default to null to indicate loading state
    const { feedbackID } = useParams();
    const { id, userType } = useAuthStore(); 
    const navigate = useNavigate()
    
    useEffect(() => {
        if (id && id !== "0" && userType === 'publicuser') {
            // User is authorized; no action needed
            return;
        } else {
            // User is not authorized; show alert and redirect
            alert("You are not authorized to view this page! Only public users are allowed to view this page.");
            navigate('/');
        }
    }, [id, userType]); 
  
    useEffect(() => {
        async function getData() {
            const { data, error } = await supabase
                .from('Feedback')
                .select(`
                *, 
                Hawker (
                    *,
                    User (*),
                    BusinessInfo (*)
                ) 
                `)
                .eq('feedbackID', feedbackID) // Fetch a specific feedback entry
                .single(); // Ensures the result is a single object instead of an array
          
            if (error) {
                console.error('Error fetching feedback:', error);
            } else if (data) { // No need to check for `data.length`
                setInfo(data); // `data` is already a single object
                console.log('Feedback with hawker data:', data);
            } else {
                console.log("No data found");
                setInfo(null); // Set null explicitly if no data is found
            }
        }

        getData();
    }, [feedbackID]);

    return (
        <>
            <NavigationBar />
            <section className="p-10">
                <div className="mb-5 text-[12px]">
                    <a href="/publicuser/feedback" className="text-blue-600 hover:underline">Feedback</a>
                    <span> {">"} </span>
                    {info && (
                        <a href={`/publicuser/feedback/${info.feedbackID}`} className="text-blue-600 hover:underline">Submit Feedback</a>
                    )}
                </div>
                {info ? (
                    <div className="border border-[#e0e0e0] flex flex-col mx-auto w-[550px] px-12 py-10 rounded-lg">
                        <h1 className="text-2xl font-bold text-center">Feedback to</h1>
                        <h3 className="text-[#555] font-semibold text-center">{info.Hawker?.BusinessInfo[0].businessName || "Unknown Hawker"}</h3>
                        
                        <div className="mt-8">
                            <h4 className="font-semibold">Title</h4>
                            <p className="text-[#333]  text-justify">{info.feedbackTitle}</p>
                        </div>

                        <div className="mt-4">
                            <h4 className="font-semibold">Description</h4>        
                            <p className="text-[#333] text-justify">{info.feedbackDescription}</p>
                        </div>

                        <div className="mt-4">
                            <h4 className="font-semibold">Hawker Rating</h4>
                            <p className="text-[#333] ">{info.hawkerRating}</p>
                        </div>

                        <div className="mt-4">
                            <h4 className="font-semibold">Image For Supporting Evidence </h4>
                            { info.imageForSupportingEvidence ? (
                                <p className="font-semibold text-blue-600 underline">
                                    <a target="_blank" href={info.imageForSupportingEvidence} rel="noopener noreferrer">Photo link</a>
                                </p>
                            ) : (
                                <p className="text-[#333]">No image provided</p>
                            )}
                            
                        </div>

                        <div className="mt-4">
                            <h4 className="font-semibold">Created At</h4>
                            <p className="text-[#333]">{new Date(info.createdAt).toLocaleString()}</p>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Loading feedback details...</p>
                )}
            </section>
        </>
    );
}
