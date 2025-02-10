import { useEffect, useState } from "react";
import { BlueFileInput } from "../../components/General/BlueFileInput";
import HawkerNavigationBar from "../../components/Hawkers/HawkerNavigationBar";
import useAuthStore from "../../store/useAuthStore";
import { supabase } from "../../utils/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function RenewLicensePage() {
    const { id: hawkerId, userType } = useAuthStore(); 
    const [locationPlan, setLocationPlan] = useState("");
    const [passportPhoto, setPassportPhoto] = useState(null);
    const [paymentProof, setPaymentProof] = useState(null);
    const [foodHandlingCertificate, setFoodHandlingCertificate] = useState(null);
    const [typhoidInjectionCard, setTyphoidInjectionCard] = useState(null);
    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({
        locationPlan: "",
        passportPhoto: "",
        paymentProof: "",
        foodHandlingCertificate: "",
        typhoidInjectionCard: ""
    })

    useEffect(() => {
        if (hawkerId && hawkerId !== "0" && userType === 'hawker') {
            // User is authorized; no action needed
            return;
        } else {
            // User is not authorized; show alert and redirect
            alert("You are not authorized to view this page! Only hawkers are allowed to view this page.");
            navigate('/');
        }
    }, [hawkerId, userType]);

    

    const handlePassportPhotoChange = (file) => setPassportPhoto(file)
    const handlePaymentProofChange = (file) => setPaymentProof(file)
    const handleFoodHandlingCertificate = (file) => setFoodHandlingCertificate(file)
    const handleTyphoidInjectionCard = (file) => setTyphoidInjectionCard(file)

    async function handleSubmit(e) {
        e.preventDefault()
        setIsSubmitting(true)

        setErrors({ 
            locationPlan: "",
            passportPhoto: "",
            paymentProof: "",
            foodHandlingCertificate: "",
            typhoidInjectionCard: ""
        })

        const validationErrors = validateForm();
        setErrors(validationErrors);
        if (Object.values(validationErrors).some(error => error !== "")) {
            setIsSubmitting(false);
            return; // Stop submission if there are errors
        }

        const [
            passportPhotoUrl,
            paymentProofUrl,
            foodHandlingCertificateUrl,
            typhoidInjectionCardUrl
        ] = await Promise.all([
            uploadPassportPhoto(),
            uploadPaymentProof(),
            uploadFoodHandlingCertificate(),
            uploadTyphoidInjectionCard()
        ]);

        const { uploadError } = await supabase.from('LicenseApplication').insert({
            locationPlan: locationPlan,
            passportPhoto: passportPhotoUrl,
            paymentProof: paymentProofUrl,
            foodHandlingCertificate: foodHandlingCertificateUrl,
            typhoidInjectionCard: typhoidInjectionCardUrl,
            hawkerID: hawkerId,
            isRenew: true
        })
                
        if(uploadError) {
            setIsSubmitting(false)
            alert("Error occured, cannot upload license application. Please check the inputted information is correct.")
            console.log("Error occured", uploadError)
            return
        } else {
            setIsSubmitting(false)
            alert("Successfully applied for renew license. Give it some time to be reviewed.")
            navigate("/hawker/dashboard")
        }
    }

    async function uploadPassportPhoto() {
        const { data: uploadData, error: uploadError } = await supabase
            .storage
            .from('passportPhoto')
            .upload(passportPhoto.name, passportPhoto, {
                cacheControl: '3600',
                upsert: false,
            });

        if(uploadError) {
            console.error("error occured", uploadError);
        }

        const { data: getData } = await supabase
            .storage
            .from('passportPhoto')
            .getPublicUrl(uploadData.path);   
        
        if(!getData) {
            console.error("No image retrieved")
        }
        
        return getData.publicUrl
    }

    async function uploadPaymentProof() {
        const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('paymentProof')
        .upload(paymentProof.name, paymentProof, {
            cacheControl: '3600',
            upsert: false,
        });

        if(uploadError) {
            console.error("error occured", uploadError);
        }

        const { data: getData } = await supabase
            .storage
            .from('paymentProof')
            .getPublicUrl(uploadData.path);   
        
        if(!getData) {
            console.error("No image retrieved")
        }
        
        return getData.publicUrl
    }

    async function uploadFoodHandlingCertificate() {
        const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('foodHandlingCertificate')
        .upload(foodHandlingCertificate.name, foodHandlingCertificate, {
            cacheControl: '3600',
            upsert: false,
        });

        if(uploadError) {
            console.error("error occured", uploadError);
        }

        const { data: getData } = await supabase
            .storage
            .from('foodHandlingCertificate')
            .getPublicUrl(uploadData.path);   
        
        if(!getData) {
            console.error("No image retrieved")
        }
        
        return getData.publicUrl
    }

    async function uploadTyphoidInjectionCard() {
        const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('typhoidInjectionCard')
        .upload(typhoidInjectionCard.name, typhoidInjectionCard, {
            cacheControl: '3600',
            upsert: false,
        });

        if(uploadError) {
            console.error("error occured", uploadError);
        }

        const { data: getData } = await supabase
            .storage
            .from('typhoidInjectionCard')
            .getPublicUrl(uploadData.path);   
        
        if(!getData) {
            console.error("No image retrieved")
        }
        
        return getData.publicUrl
    }

    function validateForm() {
        let newErrors = {
            locationPlan: "",
            passportPhoto: "",
            paymentProof: "",
            foodHandlingCertificate: "",
            typhoidInjectionCard: ""
        }

        if (!locationPlan) {
            newErrors.locationPlan = "Location Plan is required.";
        } else if (locationPlan.trim().length < 10) {
            newErrors.locationPlan = "Location Plan must be at least 10 characters long.";
        } else if (!/^[a-zA-Z0-9\s,.\-\/]+$/.test(locationPlan.trim())) {
            newErrors.locationPlan = "Location Plan contains invalid characters.";
        } else if (/^\d+$/.test(locationPlan.trim())) {
            newErrors.locationPlan = "Location Plan must include letters.";
        } else if (!/\b\d{5}\b/.test(locationPlan.trim())) {
            newErrors.locationPlan = "Location Plan must include a valid 5-digit postcode.";
        }
    
        if (!passportPhoto) {
            newErrors.passportPhoto = "Passport Photo is required.";
        } else if (!(passportPhoto.type === "image/jpeg" || passportPhoto.type === "image/png")) {
            newErrors.passportPhoto = "Hawker Image must be in JPG or PNG format.";
        }
    
        if (!paymentProof) {
            newErrors.paymentProof = "Payment Proof is required.";
        } else if (!(paymentProof.type === "image/jpeg" || paymentProof.type === "image/png" || paymentProof.type === "application/pdf")) {
            newErrors.paymentProof = "Hawker Image must be in either JPG/JPEG, PNG or PDF format.";
        }
    
        if (!foodHandlingCertificate) {
            newErrors.foodHandlingCertificate = "Food Handling Certificate is required.";
        } else if (foodHandlingCertificate.type !== "application/pdf") {
            newErrors.foodHandlingCertificate = "Food Handling Certificate must be in PDF format.";
        }
    
        if (!typhoidInjectionCard) {
            newErrors.typhoidInjectionCard = "Typhoid Injection Card is required.";
        } else if (typhoidInjectionCard.type !== "application/pdf") {
            newErrors.typhoidInjectionCard = "Typhoid Injection Card must be in PDF format.";
        }

        return newErrors
    }


  return (
    <>
    <HawkerNavigationBar />
    <section className="p-10">
                <div className="mb-5 text-[12px]">
                    <a href="/hawker/dashboard" className="text-blue-600 hover:underline">Dashboard</a>
                    <span> {">"} </span>
                    <a href="/hawker/renew-license" className="text-blue-600 hover:underline">Renew License</a>
                </div>
                <form action="" onSubmit={handleSubmit}>
                <div className="flex flex-col mx-auto w-[530px] p-4 rounded-lg">
                    <h1 className="text-2xl font-bold text-center">Renew License</h1>
                    
                    <div className="flex flex-col mt-8">
                        <label htmlFor="" className="font-semibold">Location Plan:</label>
                        <input placeholder="No.1 Jalan Setapak, Bandar Puteri Rimbayu, 45260 J.." type="text" onChange={(e) => setLocationPlan(e.target.value)} className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                        {errors.locationPlan && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800">{errors.locationPlan}</p>}
                    </div>
    
                    <div className="flex flex-col mt-6">
                        <label htmlFor="" className="font-semibold">Passport Photo:  </label>
                        <BlueFileInput onChange={handlePassportPhotoChange} type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                        {errors.passportPhoto && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800">{errors.passportPhoto}</p>}
                    </div>
                    <div className="flex flex-col mt-6">
                        <label htmlFor="" className="font-semibold">Payment Proof:</label>
                        <BlueFileInput onChange={handlePaymentProofChange} type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                        {errors.paymentProof && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800">{errors.paymentProof}</p>}
                    </div>
    
                    <div className="flex flex-col mt-6">
                        <label htmlFor="" className="font-semibold">Food Handling Certificate: </label>
                        <BlueFileInput onChange={handleFoodHandlingCertificate} type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                        {errors.foodHandlingCertificate && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800">{errors.foodHandlingCertificate}</p>}
                    </div>
                    
                    <div className="flex flex-col mt-6">
                        <label htmlFor="" className="font-semibold">Typhoid Injection Card:</label>
                        <BlueFileInput onChange={handleTyphoidInjectionCard} type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                        {errors.typhoidInjectionCard && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800">{errors.typhoidInjectionCard}</p>}
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
  )
}
