import { useEffect, useState } from "react";
import { BlueFileInput } from "../../components/General/BlueFileInput";
import { supabase } from "../../utils/supabaseClient";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import HawkerNavigationBar from "../../components/Hawkers/HawkerNavigationBar";
import { hawkerBusinessTypes } from "../../utils/hawkerBusinessTypes";
import { malaysianBanks } from "../../utils/bankName";
import { experienceOptions } from "../../utils/experienceOptions";

export default function ApplyForLicensePage() {
    const { id: hawkerId, userType } = useAuthStore(); 
    const navigate = useNavigate();

    // input field states
    const [bankAccountNumber, setBankAccountNumber] = useState("");
    const [bankName, setBankName] = useState("");
    const [bankHolderName, setBankHolderName] = useState("");
    const [employmentStatus, setEmploymentStatus] = useState("");
    const [householdIncome, setHouseholdIncome] = useState(0);
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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({
        bankAccountNumber: "",
        bankName: "",
        bankHolderName: "",
        employmentStatus: "",
        householdIncome: "",
        businessName: "",
        businessType: "",
        businessStartTime: "",
        businessEndTime: "",
        locationPlan: "",
        passportPhoto: "",
        paymentProof: "",
        foodHandlingCertificate: "",
        typhoidInjectionCard: "",
        businessExperience: "",
        foodType: "",
        form: ""
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        setIsSubmitting(true)

        setErrors({
            bankAccountNumber: "",
            bankName: "",
            bankHolderName: "",
            employmentStatus: "",
            householdIncome: "",
            businessName: "",
            businessType: "",
            businessStartTime: "",
            businessEndTime: "",
            locationPlan: "",
            passportPhoto: "",
            paymentProof: "",
            foodHandlingCertificate: "",
            typhoidInjectionCard: "",
            businessExperience: "",
            foodType: "",
            form: ""
        })

        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.values(validationErrors).some(error => error !== "")) {
            setIsSubmitting(false);
            return; // Stop submission if there are errors
        }
    
        try {
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

            alert("Successfully applied for license!")
            navigate("/hawker/dashboard")

        } catch (error) {
            setIsSubmitting(false);
            console.error(error.message);
            setErrors({ form: error.message });
        }
    }

    function validateForm() {
        let newErrors = {
            bankAccountNumber: "",
            bankName: "",
            bankHolderName: "",
            employmentStatus: "",
            householdIncome: "",
            businessName: "",
            businessType: "",
            businessStartTime: "",
            businessEndTime: "",
            locationPlan: "",
            passportPhoto: "",
            paymentProof: "",
            foodHandlingCertificate: "",
            typhoidInjectionCard: "",
            businessExperience: "",
            foodType: ""
        };
    
        const bankAccountRegex = /^\d{10,16}$/; // Malaysian bank account numbers range from 10 to 16 digits
        if (!bankAccountNumber) {
            newErrors.bankAccountNumber = "Bank Account Number is required.";
        } else if (!bankAccountRegex.test(bankAccountNumber)) {
            newErrors.bankAccountNumber = "Bank Account Number must be between 10 to 16 digits only.";
        }
    
        if (!bankName) {
            newErrors.bankName = "Bank Name is required.";
        }
    
        const nameRegex = /^[A-Za-z ]+$/;
        if (!bankHolderName) {
            newErrors.bankHolderName = "Bank Holder Name is required.";
        } else if (bankHolderName.length < 3) {
            newErrors.bankHolderName = "Full name must be at least 3 characters long.";
        } else if (!nameRegex.test(bankHolderName)) {
            newErrors.bankHolderName = "Bank Holder Name must contain only letters and spaces.";
        }
    
        if (!employmentStatus) {
            newErrors.employmentStatus = "Employment Status is required.";
        }
    
        if (!householdIncome) {
            newErrors.householdIncome = "Household Income is required.";
        } else if (householdIncome < 0) {
            newErrors.householdIncome = "Household Income must be a positive number.";
        } else if (householdIncome < 1500) {
            newErrors.householdIncome = "Household Income must be at least RM 1500.";
        }
    
        if (!businessName) {
            newErrors.businessName = "Business Name is required.";
        } else if (businessName.length < 3) {
            newErrors.businessName = "Full name must be at least 3 characters long.";
        } else if (!nameRegex.test(businessName)) {
            newErrors.businessName = "Business Name must contain only letters and spaces.";
        }
    
        if (!businessType) {
            newErrors.businessType = "Business Type is required.";
        }
    
        if (!businessStartTime) {
            newErrors.businessStartTime = "Business Start Time is required.";
        }
        
        if (!businessEndTime) {
            newErrors.businessEndTime = "Business End Time is required.";
        }
        
        if (businessStartTime && businessEndTime) {
            // Convert the time strings to hours and minutes
            const [startHours, startMinutes] = businessStartTime.split(":").map(Number);
            const [endHours, endMinutes] = businessEndTime.split(":").map(Number);
        
            // Convert to minutes since midnight for easy comparison
            const startTimeInMinutes = startHours * 60 + startMinutes;
            const endTimeInMinutes = endHours * 60 + endMinutes;
        
            if (startTimeInMinutes >= endTimeInMinutes) {
                newErrors.businessEndTime = "Business End Time must be after Business Start Time.";
            } else if ((endTimeInMinutes - startTimeInMinutes) < 60) {
                newErrors.businessEndTime = "Minimum business operation time is 1 hour.";
            }
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
    
        if (!businessExperience) {
            newErrors.businessExperience = "Business Experience is required.";
        }
    
        if (!foodType) {
            newErrors.foodType = "Food Type is required.";
        } else if(foodType.length < 3) {
            newErrors.foodType = "Food Type must be at least 3 characters long.";
        } else if (!/^[A-Za-z\s]+$/.test(foodType)) {
            newErrors.foodType = "Food Type can only contain letters and spaces.";
        }

        
        return newErrors;
    }

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
        const uniqueName = `${Date.now()}_${passportPhoto.name}`;

        const { data: uploadData, error: uploadError } = await supabase
            .storage
            .from('passportPhoto')
            .upload(uniqueName, passportPhoto, {
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
        const uniqueName = `${Date.now()}_${paymentProof.name}`;

        const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('paymentProof')
        .upload(uniqueName, paymentProof, {
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
        const uniqueName = `${Date.now()}_${foodHandlingCertificate.name}`;

        const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('foodHandlingCertificate')
        .upload(uniqueName, foodHandlingCertificate, {
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
        const uniqueName = `${Date.now()}_${typhoidInjectionCard.name}`;

        const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('typhoidInjectionCard')
        .upload(uniqueName, typhoidInjectionCard, {
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
                <a href="" className="text-blue-600 hover:underline">Apply License</a>
            </div>
            <form onSubmit={handleSubmit}>
            <div className="flex justify-between max-w-[1200px]">
                <h1 className="text-[32px] font-bold">Apply For License</h1>
                <input
                    type="submit"
                    className={`hover:bg-blue-700 active:bg-blue-800 rounded-md py-3 px-16 text-white ${ isSubmitting ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600'}`}
                    value={isSubmitting ? "Submitting..." : "Submit"}
                    disabled={isSubmitting}
                />            
            </div>
            <div className="max-w-[1200px]">
            {errors.form && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800">{errors.form}</p>}
            </div>
            <main className="grid grid-cols-2 gap-x-64 max-w-[1200px]">
                <div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Bank Account Number:</label>
                        <input type="text" placeholder="140221131004" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" onChange={(e) => setBankAccountNumber(e.target.value)} />
                        {errors.bankAccountNumber && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800">{errors.bankAccountNumber}</p>}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Bank Name:</label>
                        <select 
                            className="border border-[#e0e0e0] rounded-md py-3 px-4 mt-1"
                            onChange={(e) => setBankName(e.target.value)}
                        >
                            <option value="" disabled selected>Select Bank</option>
                            {malaysianBanks.map((type, index) => (
                                <option key={index} value={index === 0 ? "" : type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                        {errors.bankName && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800">{errors.bankName}</p>}
                    
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Bank Holder Name:</label>
                        <input type="text" placeholder="John Doe" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" onChange={(e) => setBankHolderName(e.target.value)}/>
                        {errors.bankHolderName && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800">{errors.bankHolderName}</p>}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Employment Status:</label>
                        <select 
                            id="employmentStatus"
                            className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1"
                            onChange={(e) => setEmploymentStatus(e.target.value)}
                        >
                            <option value="" disabled selected>Select Employment Status</option>
                            <option value="Employed">Employed</option>
                            <option value="Self-Employed">Self-Employed</option>
                            <option value="Unemployed">Unemployed</option>
                            <option value="Student">Student</option>
                            <option value="Retired">Retired</option>
                            <option value="Others">Others</option>
                        </select>
                        {errors.employmentStatus && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800">{errors.employmentStatus}</p>}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Household Income {"(in RM & represent annually)"}:</label>
                        <input type="number" placeholder="4000" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" onChange={(e) => setHouseholdIncome(e.target.value)}/>
                        {errors.householdIncome && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800">{errors.householdIncome}</p>}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Business Name:</label>
                        <input type="text" placeholder="Uncle Sam's Fried Chicken" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" onChange={(e) => setBusinessName(e.target.value)}/>
                        {errors.businessName && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800">{errors.businessName}</p>}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Business Type:</label>
                        <select 
                            id="businessType"
                            className="border border-[#e0e0e0] rounded-md py-3 px-4 mt-1"
                            onChange={(e) => setBusinessType(e.target.value)}
                        >
                            <option value="" disabled selected>Select Business Type</option>
                            {hawkerBusinessTypes.map((type, index) => (
                                <option key={index} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>

                        {errors.businessType && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800">{errors.businessType}</p>}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Business Start Time:</label>
                        <input type="time" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" onChange={(e) => setBusinessStartTime(e.target.value)}/>
                        {errors.businessStartTime && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800">{errors.businessStartTime}</p>}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Business End Time:</label>
                        <input type="time" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" onChange={(e) => setBusinessEndTime(e.target.value)}/>
                        {errors.businessEndTime && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800">{errors.businessEndTime}</p>}
                    </div>
                </div>

                <div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Location Plan: </label>
                        <input placeholder="No.1 Jalan Setapak, Bandar Puteri Rimbayu, 45260 J.." type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" onChange={(e) => setLocationPlan(e.target.value)}/>
                        {errors.locationPlan && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800">{errors.locationPlan}</p>}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Passport Photo: </label>
                        <BlueFileInput type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4" onChange={handlePassportPhotoChange}/>
                        {errors.passportPhoto && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800">{errors.passportPhoto}</p>}
                    </div>

                    <div className="mt-5 border-2 border-yellow-500 bg-yellow-100 text-yellow-700 rounded-[5px] py-2 px-4 ">
                        IMPORTANT NOTE, pay to:
                        <p><b>Bank Number</b>: 12393613724</p>
                        <p><b>Bank Name:</b> MayBank</p>
                        <p><b>Bank Holder Name:</b> George Washington</p>
                        <p><b>Amount:</b> RM 1000</p>
                    </div>
                    <div className="flex flex-col mt-2">
                        <label htmlFor="" className="font-semibold">Payment Proof:</label>
                        <BlueFileInput type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4" onChange={handlePaymentProofChange}/>
                        {errors.paymentProof && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800">{errors.paymentProof}</p>}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Food Handling Certificate:</label>
                        <BlueFileInput type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4" onChange={handleFoodHandlingCertificate}/>
                        {errors.foodHandlingCertificate && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800">{errors.foodHandlingCertificate}</p>}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold mb-1">Typhoid Injection Card:</label>
                        <BlueFileInput type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4" onChange={handleTyphoidInjectionCard} />
                        {errors.typhoidInjectionCard && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800">{errors.typhoidInjectionCard}</p>}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Business Experience: <span className="text-[15px] text-gray-800 font-bold" > {"(must be in years)"}</span></label>
                        <select 
                            id="businessExperience"
                            className="border border-[#e0e0e0] rounded-md py-3 px-4 mt-1"
                            onChange={(e) => setBusinessExperience(e.target.value)}
                        >
                            <option value="">Select Experience</option>
                            {experienceOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        {errors.businessExperience && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800">{errors.businessExperience}</p>}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Food Type: <span className="text-[15px] text-gray-800 font-bold" > {"(write 'None' if your stall is not a food related stall)"}</span></label>
                        <input type="text" placeholder="asian cuisine..." className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" onChange={(e) => setFoodType(e.target.value)}/>
                        {errors.foodType && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800">{errors.foodType}</p>}
                    </div>
                </div>
            </main>
            </form>
        </section>
    </>
  )
}
