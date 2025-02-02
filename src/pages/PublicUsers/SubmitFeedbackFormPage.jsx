import { useEffect, useState } from "react";
import { BlueFileInput } from "../../components/General/BlueFileInput";
import NavigationBar from "../../components/PublicUsers/NavigationBar";
import { supabase } from "../../utils/supabaseClient";
import useAuthStore from "../../store/useAuthStore";

export default function SubmitFeedbackFormPage() {
    const [feedbackTitle, setFeedbackTitle] = useState();
    const [feedbackDescription, setFeedbackDescription] = useState();
    const [hawkerName, setHawkerName] = useState();
    const [hawkerRating, setHawkerRating] = useState();
    const [image, setImage] = useState();
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
  

    const handleFileChange = (file) => setImage(file); 
    
    const handleSubmitPart1 = async () => {
        console.log({
            feedbackTitle,
            feedbackDescription,
            hawkerName,
            hawkerRating,
            image,
        });
    
        // Upload the image to the Supabase bucket
        const { data, error } = await supabase
            .storage
            .from('ImageForEvidenceForFeedback')
            .upload(image.name, image, {
                cacheControl: '3600',
                upsert: false,
            });
    
        if (error) {
            console.error("Upload Error:", error.message);
            return;
        }

        console.log(data.path);
        await handleSubmitPart2(data.path);
    };

    async function handleSubmitPart2(path) {
        console.log("hello");

        const { data, error } = supabase
            .storage
            .from('ImageForEvidenceForFeedback')
            .getPublicUrl(path);   
        
        if(error) console.log("Error:", error);
        if(image) console.log("Image:", data.publicUrl);

        const { postError } = await supabase.from('Feedback').insert({
            publicUserID: 3, 
            hawkerID: 2, 
            feedbackTitle: feedbackTitle, 
            feedbackDescription: feedbackDescription, 
            hawkerRating: hawkerRating, 
            imageForSupportingEvidence: data.publicUrl
        })
        
        if(postError) {
            console.log(error);
        }
    }

  return (
    <>
        <NavigationBar />
        <section className="p-10">
            <div className="mb-5 text-[12px]">
                <a href="" className="text-blue-600 hover:underline">Feedback</a>
                <span> {">"} </span>
                <a href="" className="text-blue-600 hover:underline">Submit Feedback</a>
            </div>

            <div className="border border-[#e0e0e0]  flex flex-col mx-auto w-[530px] p-16 rounded-lg">
                <h1 className="text-2xl font-bold text-left">Submit Feedback</h1>
                
                <div className="flex flex-col mt-8">
                    <label htmlFor="" className="font-semibold">Feedback Title:</label>
                    <input type="text" onChange={(e) => setFeedbackTitle(e.target.value)} className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                </div>

                <div className="flex flex-col mt-4">
                    <label htmlFor="" className="font-semibold">Feedback Description:</label>
                    <input type="text" onChange={(e) => setFeedbackDescription(e.target.value)} className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                </div>

                <div className="flex flex-col mt-4">
                    <label htmlFor="" className="font-semibold">Hawker Rating:</label>
                    <input type="text" onChange={(e) => setHawkerRating(e.target.value)} className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                </div>
                <div className="flex flex-col mt-4">
                    <label htmlFor="" className="font-semibold">Image for Evidence <i className="font-normal">{"(Optional)"}</i>:</label>
                    <BlueFileInput onChange={handleFileChange} className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                </div>
                <button className="bg-blue-600 py-3 text-white mt-8 rounded-md" onClick={handleSubmitPart1}>Submit</button>

            </div>
        </section>
    </>
  )
}
