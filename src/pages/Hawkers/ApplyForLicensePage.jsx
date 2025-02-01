import { useEffect, useState } from "react";
import AdminNavigationBar from "../../components/Admin/AdminNavigationBar";
import { BlueFileInput } from "../../components/General/BlueFileInput";
import { supabase } from "../../utils/supabaseClient";
import { Navigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

export default function ApplyForLicensePage() {
    const { id: hawkerId, userType } = useAuthStore(); 
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [bankAccountNumber, setBankAccountNumber] = useState("");
    const [bankName, setBankName] = useState("");
    const [bankHolderName, setBankHolderName] = useState("");
    const [employmentStatus, setEmploymentStatus] = useState("");
    const [householdIncome, setHouseholdIncome] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [businessType, setBusinessType] = useState("");
    const [businessStartTime, setBusinessStartTime] = useState("");
    const [businessEndTime, setBusinessEndTime] = useState("");
    const [locationPlan, setLocationPlan] = useState("");
    const [passportPhoto, setPassportPhoto] = useState(null);
    const [paymentProof, setPaymentProof] = useState(null);
    const [foodHandlingCertificate, setFoodHandlingCertificate] = useState(null);
    const [typhoidInjectionCard, setTyphoidInjectionCard] = useState(null);
    const [businessExperience, setBusinessExperience] = useState("");
    const [foodType, setFoodType] = useState("");
    const [redirectIfSuccess, setRedirectIfSuccess] = useState(false)

    useEffect(() => {
        if (userType !== 'hawker') {
            setShouldRedirect(true);
        }
    }, [userType]);  

    if (shouldRedirect) {
        return <Navigate to="/" replace />;
    } 

    if(redirectIfSuccess) {
        return <Navigate to="/hawker/dashboard" replace />;
    }

    const handlePassportPhotoChange = (file) => setPassportPhoto(file)
    const handlePaymentProofChange = (file) => setPaymentProof(file)
    const handleFoodHandlingCertificate = (file) => setFoodHandlingCertificate(file)
    const handleTyphoidInjectionCard = (file) => setTyphoidInjectionCard(file)

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        // try {
            // Wait for all uploads to complete
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

            await Promise.all([
                uploadBusinessInfo(),
                uploadFinanceDetails(),
                uploadLicenseApplication(passportPhotoUrl, paymentProofUrl, foodHandlingCertificateUrl, typhoidInjectionCardUrl)
            ]);

            setRedirectIfSuccess(true)
            alert("Successfully applied for license!")
    };

    async function uploadLicenseApplication(passportPhotoUrl, paymentProofUrl, foodHandlingCertificateUrl, typhoidInjectionCardUrl) {
        const { uploadError } = await supabase.from('LicenseApplication').insert({
            locationPlan: locationPlan,
            passportPhoto: passportPhotoUrl,
            paymentProof: paymentProofUrl,
            foodHandlingCertificate: foodHandlingCertificateUrl,
            typhoidInjectionCard: typhoidInjectionCardUrl,
            hawkerID: hawkerId
        })
        
        if(uploadError) {
            alert("Error occured, cannot upload license application. Please check the inputted information is correct.")
            console.log("Error occured", uploadError)
        }
    }

    async function uploadBusinessInfo() {
        const { uploadError } = await supabase.from('BusinessInfo').insert({
            businessName: businessName,
            businessType: businessType,
            businessStartTime: businessStartTime,
            businessEndTime: businessEndTime,
            businessExperience: businessExperience,
            foodType: foodType,
            hawkerID: hawkerId
        })

        if(uploadError) {
            alert("Error occured, cannot upload business info. Please check the inputted information is correct.")
            console.error("error occured", uploadError);
        }
    }

    async function uploadFinanceDetails() {
        const { uploadError } = await supabase.from('HawkerFinanceDetails').insert({
            bankAccountNumber: bankAccountNumber,
            bankHolderName: bankHolderName,
            bankName: bankName,
            employmentStatus: employmentStatus,
            householdIncome: householdIncome,
            hawkerID: hawkerId
        })

        if(uploadError) {
            alert("Error occured, cannot upload finance details. Please check the inputted information is correct.")
            console.error("error occured", uploadError);
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
    
    return (
    <>
        <AdminNavigationBar />
        <section className="p-10">
            <div className="mb-5 text-[12px]">
                <a href="" className="text-blue-600 hover:underline">Dashboard</a>
                <span> {">"} </span>
                <a href="" className="text-blue-600 hover:underline">Apply License</a>
            </div>
            <form onSubmit={handleSubmit}>
            <div className="flex justify-between max-w-[1200px]">
                <h1 className="text-[32px] font-bold">Apply For License</h1>
                <button className="bg-blue-600 rounded-md py-3 px-16 text-white">Submit</button>
            </div>
            
            <main className="grid grid-cols-2 gap-x-64 max-w-[1200px]">
                <div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Bank Account Number:</label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" onChange={(e) => setBankAccountNumber(e.target.value)} />
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Bank Name:</label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" onChange={(e) => setBankName(e.target.value)}/>
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Bank Holder Name:</label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" onChange={(e) => setBankHolderName(e.target.value)}/>
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Employment Status:</label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" onChange={(e) =>setEmploymentStatus(e.target.value)}/>
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Household Income:</label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" onChange={(e) => setHouseholdIncome(e.target.value)}/>
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Business Name:</label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" onChange={(e) => setBusinessName(e.target.value)}/>
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Business Type:</label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" onChange={(e) => setBusinessType(e.target.value)}/>
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Business Start Time:</label>
                        <input type="time" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" onChange={(e) => setBusinessStartTime(e.target.value)}/>
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Business End Time:</label>
                        <input type="time" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" onChange={(e) => setBusinessEndTime(e.target.value)}/>
                    </div>
                </div>

                <div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Location Plan: </label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" onChange={(e) => setLocationPlan(e.target.value)}/>
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Passport Photo: </label>
                        <BlueFileInput type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4" onChange={handlePassportPhotoChange}/>
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Payment Proof {"(RM 1000)"}:</label>
                        <BlueFileInput type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4" onChange={handlePaymentProofChange}/>
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Food Handling Certificate:</label>
                        <BlueFileInput type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4" onChange={handleFoodHandlingCertificate}/>
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold mb-1">Typhoid Injection Card:</label>
                        <BlueFileInput type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4" onChange={handleTyphoidInjectionCard} />
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Business Experience:</label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" onChange={(e) => setBusinessExperience(e.target.value)}/>
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Food Type:</label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" onChange={(e) => setFoodType(e.target.value)}/>
                    </div>
                </div>
            </main>
            </form>
        </section>
    </>
  )
}
