import { useEffect, useState } from "react";
import { BlueFileInput } from "../../components/General/BlueFileInput";
import { supabase } from "../../utils/supabaseClient";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import HLMNavigationBar from "../../components/HLM/NavigationBarHLM";

export default function AddInspectionDetailsPage() {
    const navigate = useNavigate();
    const [inspectionOutcome, setInspectionOutcome] = useState("");
    const [inspectionDate, setInspectionDate] = useState("");
    const [inspectionTime, setInspectionTime] = useState("");
    const [inspectionRating, setInspectionRating] = useState("");
    const [inspectionPhoto, setInspectionPhoto] = useState(null);
    const [hawkers, setHawkers] = useState([]);
    const [selectedHawker, setSelectedHawker] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { id, userType } = useAuthStore();
    const [errors, setErrors] = useState({
        selectedHawker: "", 
        inspectionOutcome: "", 
        inspectionDate: "", 
        inspectionTime: "", 
        inspectionRating: "", 
        inspectionPhoto: "",
        form: ""
    });

    useEffect(() => {
            if (id && id !== "0" && userType === 'hlm') {
                // User is authorized; no action needed
                return;
            } else {
                // User is not authorized; show alert and redirect
                alert("You are not authorized to view this page! Only Hawker license manager are allowed to view this page.");
                navigate('/');
            }
        }, [id, userType]);

    const handleInspectionPhoto = (file) => setInspectionPhoto(file);

    useEffect(() => {
        async function fetchApprovedHawkers() {
            const { data, error } = await supabase
                .from("Hawker")
                .select(`
                    hawkerID,
                    BusinessInfo (businessName),
                    LicenseApplication!inner(status)
                `)
                .eq("LicenseApplication.status", "Approved");
            
            console.log(data)

            if (error) {
                console.error("Error fetching hawkers:", error);
            } else {
                setHawkers(data);
            }
        }

        fetchApprovedHawkers();
    }, []);
     
    async function handleSubmit(e) {
        e.preventDefault();

        setIsSubmitting(true);

        setErrors({
            selectedHawker: "", 
            inspectionOutcome: "", 
            inspectionDate: "", 
            inspectionTime: "", 
            inspectionRating: "", 
            inspectionPhoto: "",
            form: ""
        });    

        const validationErrors = validateForm();
        setErrors(validationErrors);
        if (Object.values(validationErrors).some(error => error !== "")) {
            setIsSubmitting(false);
            return; // Stop submission if there are errors
        }

        try {
            const inspectionPhotoUrl = await uploadInspectionPhoto();
            await uploadSiteInspectionDetails(inspectionPhotoUrl);
           
            alert("Successfully added inspection details.");
            navigate("/hlm/dashboard")
        } catch (error) {
            setIsSubmitting(false);
            console.error("Error occurred", error);
            setErrors({ form: error.message });
        }    
    }

    function validateForm() {
        let newErrors = { 
            selectedHawker: "", 
            inspectionOutcome: "", 
            inspectionDate: "", 
            inspectionTime: "" , 
            inspectionRating: "", 
            inspectionPhoto: ""
        };

        // Full Name validation
        if (!selectedHawker) {
            newErrors.selectedHawker = "hawker is required.";
        }

        // Inspection Outcome validation
        if (!inspectionOutcome) {
            newErrors.inspectionOutcome = "Inspection outcome is required.";
        } else if (inspectionOutcome.length < 10) {
            newErrors.inspectionOutcome = "Inspection outcome must be at least 10 characters.";
        } else if (/^\d+$/.test(inspectionOutcome)) {
            newErrors.inspectionOutcome = "Inspection outcome must include letters, not just numbers.";
        } else if (!/^[a-zA-Z0-9 .,?!()]+$/.test(inspectionOutcome)) {
            newErrors.inspectionOutcome = "Inspection outcome contains invalid characters. Only letters, numbers, spaces, and . , ? ! ( ) are allowed.";
        }

        // Inspection Date validation
        if (!inspectionDate) {
            newErrors.inspectionDate = "Inspection date is required.";
        } else {
            const today = new Date();
            const selectedDate = new Date(inspectionDate);
        
            // Set time to midnight to compare only the date part
            today.setHours(0, 0, 0, 0);
            selectedDate.setHours(0, 0, 0, 0);
        
            if (selectedDate > today) {
                newErrors.inspectionDate = "Inspection date cannot be in the future.";
            }
        }

        // Inspection Time validation
        if (!inspectionTime) {
            newErrors.inspectionTime = "Inspection time is required.";
        }

        // Inspection Rating validation
        if (!inspectionRating) {
            newErrors.inspectionRating = "Inspection rating is required.";
        } else if (isNaN(inspectionRating)) {
            newErrors.inspectionRating = "Inspection rating must be a number.";
        } else if (inspectionRating <= 0 || inspectionRating >= 6) {
            newErrors.inspectionRating = "Inspection rating must be between 1 and 5.";
        }

        // Inspection Photo validation
        if (!inspectionPhoto) {
            newErrors.inspectionPhoto = "Inspection photo is required.";
        } else if (!(inspectionPhoto.type === "image/jpeg" || inspectionPhoto.type === "image/png")) {
            newErrors.inspectionPhoto = "Inspection photo must be in JPG or PNG format.";
        }

        return newErrors;
    }

    async function uploadInspectionPhoto() {
        const uniqueName = `${Date.now()}_${inspectionPhoto.name}`;

        const { data: uploadData, error: uploadError } = await supabase
            .storage
            .from("inspectionPhoto")
            .upload(uniqueName, inspectionPhoto, {
                cacheControl: "3600",
                upsert: false,
            });

        if (uploadError) {
            console.error("Error uploading image:", uploadError);
            return null;
        }

        const { data: getData } = await supabase
            .storage
            .from("inspectionPhoto")
            .getPublicUrl(uploadData.path);

        return getData.publicUrl;
    }

    async function uploadSiteInspectionDetails(inspectionPhotoUrl) {
        const { error } = await supabase.from('SiteInspection').insert([
            {
                inspectionDate,
                inspectionTime,
                inspectionOutcome,
                inspectionRating,
                inspectionPhoto: inspectionPhotoUrl,
                hawkerID: selectedHawker,
            }
        ]);

        if(error) {
            console.error("Error uploading site inspection details:", error);
            throw new Error(`Upload site inspection error:`, error.message);
        }
    }

    return (
        <>
            <HLMNavigationBar />
            <section className="p-10">
                <div className="mb-5 text-[12px]">
                    <a href="/hlm/inspection-reports" className="text-blue-600 hover:underline">Inspection Reports</a>
                    <span> {">"} </span>
                    <a href="/hlm/inspection-reports/add" className="text-blue-600 hover:underline">Add Inspection</a>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col mx-auto w-[530px] p-4 rounded-lg">
                        <h1 className="text-2xl font-bold text-center">Add Inspection Details</h1>
                        {errors.form && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800 ">{errors.form}</p>}

                        {/* Select Hawker Dropdown */}
                        <div className="flex flex-col mt-8">
                            <label htmlFor="hawkerSelect" className="font-semibold">Select Hawker</label>
                            <select 
                                id="hawkerSelect"
                                value={selectedHawker}
                                onChange={(e) => setSelectedHawker(e.target.value)}
                                className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1"
                            >
                                <option value="" disabled>Select a Hawker...</option>
                                {hawkers.map((hawker) => (
                                    <option key={hawker.hawkerID} value={hawker.hawkerID}>
                                        {hawker.BusinessInfo[0].businessName}
                                    </option>
                                ))}
                            </select>
                            {errors.selectedHawker && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800">{errors.selectedHawker}</p>}
                        </div>

                        {/* Inspection Outcome */}
                        <div className="flex flex-col mt-8">
                            <label htmlFor="inspectionOutcome" className="font-semibold">Inspection Outcome:</label>
                            <textarea 
                                type="text"
                                id="inspectionOutcome"
                                value={inspectionOutcome}
                                onChange={(e) => setInspectionOutcome(e.target.value)}
                                className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1"
                            />
                            {errors.inspectionOutcome && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800">{errors.inspectionOutcome}</p>}
                        </div>

                        {/* Inspection Date */}
                        <div className="flex flex-col mt-8">
                            <label htmlFor="inspectionDate" className="font-semibold">Inspection Date:</label>
                            <input 
                                type="date"
                                id="inspectionDate"
                                value={inspectionDate}
                                onChange={(e) => setInspectionDate(e.target.value)}
                                className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1"
                            />
                            {errors.inspectionDate && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800">{errors.inspectionDate}</p>}
                        </div>

                        {/* Inspection Time */}
                        <div className="flex flex-col mt-8">
                            <label htmlFor="inspectionTime" className="font-semibold">Inspection Time:</label>
                            <input 
                                type="time"
                                id="inspectionTime"
                                value={inspectionTime}
                                onChange={(e) => setInspectionTime(e.target.value)}
                                className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1"
                            />
                            {errors.inspectionTime && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800">{errors.inspectionTime}</p>}
                        </div>

                        {/* Inspection Rating */}
                        <div className="flex flex-col mt-8">
                            <label htmlFor="inspectionRating" className="font-semibold">Inspection Rating:</label>
                            <input 
                                type="number"
                                id="inspectionRating"
                                value={inspectionRating}
                                onChange={(e) => setInspectionRating(e.target.value)}
                                className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1"
                            />
                            {errors.inspectionRating && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800">{errors.inspectionRating}</p>}
                        </div>

                        {/* Inspection Photo Upload */}
                        <div className="flex flex-col mt-6">
                            <label htmlFor="inspectionPhoto" className="font-semibold">Inspection Photo:</label>
                            <BlueFileInput 
                                onChange={handleInspectionPhoto}
                                className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1"
                            />
                            {errors.inspectionPhoto && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800">{errors.inspectionPhoto}</p>}
                        </div>

                        <input 
                            type="submit"
                            className={`hover:bg-blue-700 active:bg-blue-800 py-3 text-white font-semibold mt-16 rounded-md cursor-pointer ${ isSubmitting ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600'}`}
                            value={isSubmitting ? "Submitting..." : "Submit"}
                            disabled={isSubmitting}
                        />
                    </div>
                </form>
            </section>
        </>
    );
}
