import { useEffect, useState } from "react";
import { BlueFileInput } from "../../components/General/BlueFileInput";
import HawkerNavigationBar from "../../components/Hawkers/HawkerNavigationBar";
import useAuthStore from "../../store/useAuthStore";
import { supabase } from "../../utils/supabaseClient";
import { Navigate } from "react-router-dom";

export default function RenewLicensePage() {
    const { id: hawkerId, userType } = useAuthStore(); 
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [locationPlan, setLocationPlan] = useState("");
    const [passportPhoto, setPassportPhoto] = useState(null);
    const [paymentProof, setPaymentProof] = useState(null);
    const [foodHandlingCertificate, setFoodHandlingCertificate] = useState(null);
    const [typhoidInjectionCard, setTyphoidInjectionCard] = useState(null);
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

    async function handleSubmit(e) {
        e.preventDefault()

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
            alert("Error occured, cannot upload license application. Please check the inputted information is correct.")
            console.log("Error occured", uploadError)
        } else {
            alert("Successfully applied for renew license. Give it some time to be reviewed.")
            setRedirectIfSuccess(true)
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
    <HawkerNavigationBar />
    <section className="p-10">
                <div className="mb-5 text-[12px]">
                    <a href="" className="text-blue-600 hover:underline">Dashboard</a>
                    <span> {">"} </span>
                    <a href="" className="text-blue-600 hover:underline">Renew License</a>
                </div>
                <form action="" onSubmit={handleSubmit}>
                <div className="flex flex-col mx-auto w-[530px] p-4 rounded-lg">
                    <h1 className="text-2xl font-bold text-center">Renew License</h1>
                    
                    <div className="flex flex-col mt-8">
                        <label htmlFor="" className="font-semibold">Location Plan:</label>
                        <input type="text" onChange={(e) => setLocationPlan(e.target.value)} className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                    </div>
    
                    <div className="flex flex-col mt-6">
                        <label htmlFor="" className="font-semibold">Passport Photo:  </label>
                        <BlueFileInput onChange={handlePassportPhotoChange} type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                    </div>
                    <div className="flex flex-col mt-6">
                        <label htmlFor="" className="font-semibold">Payment Proof:</label>
                        <BlueFileInput onChange={handlePaymentProofChange} type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                    </div>
    
                    <div className="flex flex-col mt-6">
                        <label htmlFor="" className="font-semibold">Food Handling Certificate: </label>
                        <BlueFileInput onChange={handleFoodHandlingCertificate} type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                    </div>
                    <div className="flex flex-col mt-6">
                        <label htmlFor="" className="font-semibold">Typhoid Injection Card:</label>
                        <BlueFileInput onChange={handleTyphoidInjectionCard} type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                    </div>
                    <input type="submit" className="bg-blue-600 py-3 text-white font-semibold mt-16 rounded-md" />
                </div>
                </form>
            </section>
    </>
  )
}
