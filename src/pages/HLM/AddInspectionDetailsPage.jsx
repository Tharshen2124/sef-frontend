import { useEffect, useState } from "react";
import { BlueFileInput } from "../../components/General/BlueFileInput";
import HawkerNavigationBar from "../../components/Hawkers/HawkerNavigationBar";
import { supabase } from "../../utils/supabaseClient";
import { Navigate, useParams } from "react-router-dom";

export default function AddInspectionDetailsPage() {
    const { hawkerID } = useParams(); 
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [redirectIfSuccess, setRedirectIfSuccess] = useState(false);
    const [inspectionOutcome, setInspectionOutcome] = useState("");
    const [inspectionDate, setInspectionDate] = useState("");
    const [inspectionTime, setInspectionTime] = useState("");
    const [inspectionRating, setInspectionRating] = useState("");
    const [inspectionPhoto, setInspectionPhoto] = useState(null);
    const [hawkers, setHawkers] = useState([]);
    const [selectedHawker, setSelectedHawker] = useState("");

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

    console.log(hawkers)

    if (shouldRedirect) {
        return <Navigate to="/" replace />;
    } 

    if (redirectIfSuccess) {
        return <Navigate to="/hawker/dashboard" replace />;
    }
     
    const handleInspectionPhoto = (file) => setInspectionPhoto(file);

    async function handleSubmit(e) {
        e.preventDefault();

        const inspectionPhotoUrl = await uploadInspectionPhoto();

        const { error } = await supabase.from('SiteInspection').update({
            inspectionDate,
            inspectionTime,
            inspectionOutcome,
            inspectionRating,
            inspectionPhoto: inspectionPhotoUrl,
            hawkerID: selectedHawker,
        });

        if (error) {
            alert("Error occurred, cannot upload inspection details. Please check the inputted information.");
            console.error("Error occurred", error);
        } else {
            alert("Successfully added inspection details.");
            setRedirectIfSuccess(true);
        }
    }

    async function uploadInspectionPhoto() {
        if (!inspectionPhoto) return null;

        const fileName = `${Date.now()}_${inspectionPhoto.name}`;
        const { data: uploadData, error: uploadError } = await supabase
            .storage
            .from("inspectionPhoto")
            .upload(fileName, inspectionPhoto, {
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

    return (
        <>
            <HawkerNavigationBar />
            <section className="p-10">
                <div className="mb-5 text-[12px]">
                    <a href="" className="text-blue-600 hover:underline">Dashboard</a>
                    <span> {">"} </span>
                    <a href="" className="text-blue-600 hover:underline">Renew License</a>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col mx-auto w-[530px] p-4 rounded-lg">
                        <h1 className="text-2xl font-bold text-center">Add Inspection Details</h1>

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
                        </div>

                        {/* Inspection Rating */}
                        <div className="flex flex-col mt-8">
                            <label htmlFor="inspectionRating" className="font-semibold">Inspection Rating:</label>
                            <input 
                                type="number"
                                id="inspectionRating"
                                max="5"
                                min="1"
                                value={inspectionRating}
                                onChange={(e) => setInspectionRating(e.target.value)}
                                className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1"
                            />
                        </div>

                        {/* Inspection Photo Upload */}
                        <div className="flex flex-col mt-6">
                            <label htmlFor="inspectionPhoto" className="font-semibold">Inspection Photo:</label>
                            <BlueFileInput 
                                onChange={handleInspectionPhoto}
                                className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1"
                            />
                        </div>

                        <input 
                            type="submit"
                            className="bg-blue-600 py-3 text-white font-semibold mt-16 rounded-md cursor-pointer"
                            value="Submit"
                        />
                    </div>
                </form>
            </section>
        </>
    );
}
