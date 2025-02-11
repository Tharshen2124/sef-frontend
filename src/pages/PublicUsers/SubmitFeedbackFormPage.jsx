import { useEffect, useState } from "react";
import { BlueFileInput } from "../../components/General/BlueFileInput";
import NavigationBar from "../../components/PublicUsers/NavigationBar";
import { supabase } from "../../utils/supabaseClient";
import useAuthStore from "../../store/useAuthStore";
import { useNavigate, useParams } from "react-router-dom";

export default function SubmitFeedbackFormPage() {
    const [feedbackTitle, setFeedbackTitle] = useState();
    const [feedbackDescription, setFeedbackDescription] = useState();
    const [hawkerRating, setHawkerRating] = useState();
    const [image, setImage] = useState();
    const { id, userType } = useAuthStore();
    const { hawkerID } = useParams()
    const navigate = useNavigate();
    const [errors, setErrors] = useState({ 
        feedbackTitle: "",
        feedbackDescription: "",
        hawkerRating: "",
        image: ""
    });
    
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

    const handleFileChange = (file) => setImage(file); 
    
    const handleSubmitPart1 = async () => {

        const newErrors = validateForm();
        setErrors(newErrors);

        if (Object.values(newErrors).some(x => x !== "")) {
            return;
        }

        if (!image) {
            await handleSubmitPart2(null);
            return;
        }
        const uniqueName = `${Date.now()}_${image.name}`;


        // Upload the image to the Supabase bucket
        const { data, error } = await supabase
            .storage
            .from('ImageForEvidenceForFeedback')
            .upload(uniqueName, image, {
                cacheControl: '3600',
                upsert: false,
            });
    
        if (error) {
            console.error("Upload Error:", error.message);
            return;
        }

        await handleSubmitPart2(data.path);
    };

    async function handleSubmitPart2(path) {
        let imageUrl;

        if (path) {
            const { data, error } = supabase
                .storage
                .from('ImageForEvidenceForFeedback')
                .getPublicUrl(path);   
        
            if(error) console.log("Error:", error);
            if(image) console.log("Image:", data.publicUrl);
            imageUrl = data.publicUrl;
        } else {
            imageUrl = null;
        }
        
        const { postError } = await supabase.from('Feedback').insert({
            publicUserID: id, 
            hawkerID: hawkerID, 
            feedbackTitle: feedbackTitle, 
            feedbackDescription: feedbackDescription, 
            hawkerRating: hawkerRating, 
            imageForSupportingEvidence: imageUrl
        })
        
        if(postError) {
            console.log(error);
        } else {
            alert("Feedback submitted successfully!");
            navigate('/publicuser/feedback');
        }
    }

    function validateForm() {

        let newErrors = {
            feedbackTitle: "",
            feedbackDescription: "",
            hawkerRating: "",
            image: ""
        }
    
        if (!feedbackTitle) {
            newErrors.feedbackTitle = "Feedback title is required."
        }
    
        if (!feedbackDescription) {
            newErrors.feedbackDescription = "Feedback description is required."
        }
    
        if (!hawkerRating) {
            newErrors.hawkerRating = "Hawker rating is required."
        } else if (hawkerRating < 0 || hawkerRating > 5) {
            newErrors.hawkerRating = "Hawker rating must be between 0 and 5.";
        } else if (!Number.isInteger(Number(hawkerRating))) {
            newErrors.hawkerRating = "Hawker rating must be a whole number.";
        }
    
        if (image && image.type !== "image/jpeg" && image.type !== "image/png") {
            newErrors.image = "Image must be in JPEG or PNG format.";
        }
    
        return newErrors
    }

  return (
    <>
        <NavigationBar />
        <section className="p-10">
            <div className="mb-5 text-[12px]">
                <a href="/publicuser/feedback" className="text-blue-600 hover:underline">Feedback</a>
                <span> {">"} </span>
                {}
                <a href={`/publicuser/feedback/submit-feedback/${hawkerID}`} className="text-blue-600 hover:underline">Submit Feedback</a>
            </div>

            <div className="border border-[#e0e0e0]  flex flex-col mx-auto w-[530px] p-16 rounded-lg">
                <h1 className="text-2xl font-bold text-left">Submit Feedback</h1>

                <div className="flex flex-col mt-8">
                    <label htmlFor="" className="font-semibold">Feedback Title:</label>
                    <input type="text" placeholder="Good service" onChange={(e) => setFeedbackTitle(e.target.value)} className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                    {errors.feedbackTitle && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800">{errors.feedbackTitle}</p>}
                </div>

                <div className="flex flex-col mt-4">
                    <label htmlFor="" className="font-semibold">Feedback Description:</label>
                    <textarea type="text" placeholder="server is fast, very responsive, and is very sweet with customers" onChange={(e) => setFeedbackDescription(e.target.value)} className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                    {errors.feedbackDescription && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800">{errors.feedbackDescription}</p>}
                </div>

                <div className="flex flex-col mt-4">
                    <label htmlFor="" className="font-semibold">Hawker Rating {"(Rate from 1 to 5)"}:</label>
                    <input type="number" placeholder="5" onChange={(e) => setHawkerRating(e.target.value)} className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                    {errors.hawkerRating && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800">{errors.hawkerRating}</p>}
                </div>
                <div className="flex flex-col mt-4">
                    <label htmlFor="" className="font-semibold">Image for Evidence <i className="font-normal">{"(Optional)"}</i>:</label>
                    <BlueFileInput onChange={handleFileChange} className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                    {errors.image && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800">{errors.image}</p>}
                </div>

                <button 
                    className="bg-blue-600 py-3 text-white mt-8 rounded-md" 
                    onClick={handleSubmitPart1}
                >
                        Submit
                </button>
            </div>
        </section>
    </>
  )
}
