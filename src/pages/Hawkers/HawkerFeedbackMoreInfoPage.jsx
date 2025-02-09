import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../utils/supabaseClient";
import NavigationBar from "../../components/Hawkers/HawkerNavigationBar";

export default function HawkerFeedbackMoreInfoPage() {
    const {hawkerID, feedbackID}=useParams();
    const [feedbacks, setFeedbacks] =useState([]);

    const formattedDateTime = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString("en-CA") + " " + date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    };

    useEffect(() => {
        async function getData() {
            const { data, error } = await supabase
                .from("Feedback")
                .select(`
                    *,
                    PublicUser:publicUserID (
                    userID,
                    User:userID ( fullName )
                    )
                `)
                .eq("hawkerID", hawkerID)
                .eq("feedbackID", feedbackID) 
                .single()

            
            setFeedbacks(data);
            console.log(data);
        }
        getData();
    }, []);

    return (
        <>
            <NavigationBar />
            <section className="p-10">
                        <div className="mb-5 text-[12px]">
                            <a href="/hawker/dashboard" className="text-blue-600 hover:underline">Hawker</a>
                            <span> {">"} </span>
                            <a href="" className="text-blue-600 hover:underline">Submit Feedback</a>
                        </div>
            
                        <div className="border border-[#e0e0e0]  flex flex-col mx-auto w-[550px] px-12 py-10 rounded-lg">
                            <h1 className="text-2xl font-bold text-center">Feedback by</h1>
                            <h3 className="text-[#555] font-semibold text-center">{feedbacks?.User?.fullName || "N/A"}</h3>
                            
                            <div className="mt-8">
                                <h4 className="font-semibold">Title</h4>
                                <p className="text-[#333] text-[14px]">{feedbacks?.feedbackTitle || "N/A"}</p>
                            </div>
    
                            <div className="mt-4">
                                <h4 className="font-semibold">Description</h4>        
                                <p className="text-[#333] text-[14px] text-justify">{feedbacks?.feedbackDescription || "N/A"}</p>
                            </div>
    
                            <div className="mt-4">
                                <h4 className="font-semibold">Hawker Rating</h4>
                                <p className="text-[#333] text-[14px]">{feedbacks?.hawkerRating || "N/A"}</p>
                            </div>
    
                            <div className="mt-4">
                                <h4 className="font-semibold">Image For Supporting Evidence </h4>
                                {feedbacks?.imageForSupportingEvidence? (
                                                                    <img
                                                                        src={feedbacks.imageForSupportingEvidence}
                                                                        alt="Supporting Evidence"
                                                                            />) :<p className="text-[14px] font-semibold text-blue-600 underline">("N/A")</p>}
                            </div>
    
                            <div className="mt-4">
                                <h4 className="font-semibold">Created At</h4>
                                <p className="text-[#333] text-[14px]">{formattedDateTime(feedbacks?.createdAt || "N/A") }</p>
                            </div>
                        </div>
                    </section>
        </>
      )

}