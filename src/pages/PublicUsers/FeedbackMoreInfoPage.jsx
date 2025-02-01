import { useParams } from "react-router-dom";
import NavigationBar from "../../components/PublicUsers/NavigationBar";
import { useEffect, useState } from "react";
import { supabase } from '../../utils/supabaseClient';
import useAuthStore from "../../store/useAuthStore";

export default function FeedbackMoreInfoPage() {
    const [info, setInfo] = useState(null); // Default to null to indicate loading state
    const { feedbackID } = useParams();
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
  

    console.log(feedbackID);

    useEffect(() => {
        async function getData() {
            const { data, error } = await supabase
                .from('Feedback')
                .select(`
                    *, 
                    Hawker(*) 
                `)
                .eq('feedbackID', feedbackID); // Assuming feedbackID matches the column name

            if (error) {
                console.error('Error fetching feedback:', error);
            } else if (data && data.length > 0) {
                setInfo(data[0]); // Assuming you're only fetching one feedback
                console.log('Feedback with hawker data:', data);
            } else {
                console.warn('No feedback found for the given ID');
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
                    <a href="#" className="text-blue-600 hover:underline">Feedback</a>
                    <span> {">"} </span>
                    <a href="#" className="text-blue-600 hover:underline">Submit Feedback</a>
                </div>
                {info ? (
                    <div className="border border-[#e0e0e0] flex flex-col mx-auto w-[550px] px-12 py-10 rounded-lg">
                        <h1 className="text-2xl font-bold text-center">Feedback to</h1>
                        <h3 className="text-[#555] font-semibold text-center">{info.Hawker?.name || "Unknown Hawker"}</h3>
                        
                        <div className="mt-8">
                            <h4 className="font-semibold">Title</h4>
                            <p className="text-[#333] text-[14px] text-justify">{info.feedbackTitle}</p>
                        </div>

                        <div className="mt-4">
                            <h4 className="font-semibold">Description</h4>        
                            <p className="text-[#333] text-[14px] text-justify">{info.feedbackDescription}</p>
                        </div>

                        <div className="mt-4">
                            <h4 className="font-semibold">Hawker Rating</h4>
                            <p className="text-[#333] text-[14px]">{info.hawkerRating}</p>
                        </div>

                        <div className="mt-4">
                            <h4 className="font-semibold">Image For Supporting Evidence </h4>
                            <p className="text-[14px] font-semibold text-blue-600 underline">
                                <a target="_blank" href={info.imageForSupportingEvidence} rel="noopener noreferrer">Photo link</a>
                            </p>
                        </div>

                        <div className="mt-4">
                            <h4 className="font-semibold">Created At</h4>
                            <p className="text-[#333] text-[14px]">{new Date(info.createdAt).toLocaleString()}</p>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Loading feedback details...</p>
                )}
            </section>
        </>
    );
}
