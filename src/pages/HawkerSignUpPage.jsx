import { BlueFileInput } from "../components/General/BlueFileInput";
import HawkTuahLogo from "../assets/hawkTuahLogo.svg"
import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { races } from "../utils/races";
import { citizenshipStatuses } from "../utils/citizenshipStatuses";
import { hashPassword } from "../utils/hashPassword";

export default function HawkerSignUpPage() {
    const [fullName, setFullName] = useState();
    const [icNumber, setIcNumber] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [citizenship, setCitizenship] = useState();
    const [contactAddress, setContactAddress] = useState();
    const [mobilePhoneNumber, setMobilePhoneNumber] = useState();
    const [birthDate, setBirthDate] = useState();
    const [gender, setGender] = useState();
    const [race, setRace] = useState();
    const [hawkerImage, setHawkerImage] = useState();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { setId, setUserType } = useAuthStore.getState()
    const navigate = useNavigate();
    const [errors, setErrors] = useState({
        fullName: "",
        icNumber: "",
        email: "",
        password: "",
        citizenship: "",
        contactAddress: "",
        mobilePhoneNumber: "",
        birthDate: "",
        gender: "",
        race: "",
        hawkerImage: "",
        form: ""
    });

    const handleFileChange = (file) => {
        setHawkerImage(file);  // Save file in state
    };
        
    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSubmitting(true);

        setErrors({
            fullName: "",
            icNumber: "",
            email: "",
            password: "",
            citizenship: "",
            contactAddress: "",
            mobilePhoneNumber: "",
            birthDate: "",
            gender: "",
            race: "",
            hawkerImage: "",
            form: ""
        });    

        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.values(validationErrors).some(error => error !== "")) {
            setIsSubmitting(false);
            return; // Stop submission if there are errors
        }

        try {
            const userID = await uploadUserData();
            if (!userID) return; 

            const imageUrl = await handleImageUpload();
            const hawkerID = await uploadHawkerData(imageUrl, userID);
    
            setId(hawkerID)
            setUserType("hawker")
            alert("Successfully signed up!")
            navigate("/hawker/dashboard")

        } catch (error) {
            setIsSubmitting(false);
            console.error(error.message);
            setErrors({ form: error.message });
        }
    
    };

    function validateForm() {
        let newErrors = { fullName: "", icNumber: "", email: "", password: "" };

        // Full Name validation
        if (!fullName) {
            newErrors.fullName = "Full name is required.";
        } else if (fullName.length < 3) {
            newErrors.fullName = "Full name must be at least 3 characters long.";
        } else if (!/^[A-Za-z\s]+$/.test(fullName)) {
            newErrors.fullName = "Full name can only contain letters and spaces.";
        }

        // IC Number validation
        if (!icNumber) {
            newErrors.icNumber = "IC number is required.";
        } else if (!/^\d{6}-\d{2}-\d{4}$/.test(icNumber)) {
            newErrors.icNumber = "IC number must follow the format XXXXXX-XX-XXXX. No special characters (besides the dash) and letters.";
        }

        // Email validation
        if (!email) {
            newErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Invalid email format.";
        }

        // Password validation
        if (!password) {
            newErrors.password = "Password is required.";
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,12}$/.test(password)) {
            newErrors.password = "Password must be 8-12 characters, with an uppercase letter, a lowercase letter, and a special character.";
        }

        if (!citizenship) {
            newErrors.citizenship = "Citizenship is required.";
        }

        if (!contactAddress) {
            newErrors.contactAddress = "Contact Address is required.";
        } else if (contactAddress.trim().length < 10) {
            newErrors.contactAddress = "Contact Address must be at least 10 characters long.";
        } else if (!/^[a-zA-Z0-9\s,.\-\/]+$/.test(contactAddress.trim())) {
            newErrors.contactAddress = "Contact Address contains invalid characters.";
        } else if (/^\d+$/.test(contactAddress.trim())) {
            newErrors.contactAddress = "Contact Address must include letters.";
        } else if (!/\b\d{5}\b/.test(contactAddress.trim())) {
            newErrors.contactAddress = "Contact Address must include a valid 5-digit postcode.";
        }

        if (!mobilePhoneNumber) {
            newErrors.mobilePhoneNumber = "Mobile Phone Number is required.";
        } else if (!/^60\d{9,10}$/.test(mobilePhoneNumber)) {
            newErrors.mobilePhoneNumber = "Invalid mobile phone number format. It should start with '60' followed by 9 or 10 digits.";
        }

        if (!birthDate) {
            newErrors.birthDate = "Birth Date is required.";
        } else {
            const birthDateObj = new Date(birthDate);
            const today = new Date();
            const minAllowedDate = new Date();
            minAllowedDate.setFullYear(today.getFullYear() - 18);
    
            if (birthDateObj > minAllowedDate) {
                newErrors.birthDate = "You must be 18 years and above to register as a hawker.";
            }
        }    

        if (!gender) {
            newErrors.gender = "Gender is required";
        }

        if (!race) {
            newErrors.race = "Race is required";
        }

        if (!hawkerImage) {
            newErrors.hawkerImage = "Hawker Image is required.";
        } else if (!(hawkerImage.type === "image/jpeg" || hawkerImage.type === "image/png")) {
            newErrors.hawkerImage = "Hawker Image must be in JPG or PNG format.";
        }
        
        return newErrors;
    }


    async function handleImageUpload() {
        const uniqueName = `${Date.now()}_${hawkerImage.name}`;

        const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('HawkerImage')
        .upload(uniqueName, hawkerImage, {
            cacheControl: '3600',
            upsert: false,
        });

        if(uploadError) {
            console.error("HawkerImage", uploadError);
        }

        const { data: getData } = await supabase
            .storage
            .from('HawkerImage')
            .getPublicUrl(uploadData.path);   
        
        if(!getData) {
            console.error("No image retrieved")
        }
        
        return getData.publicUrl
    }        

    async function uploadUserData() {
        const hashedPassword = await hashPassword(password);
        const { data: userData, error: userPostError } = await supabase
            .from("User")
            .insert([
                {
                    fullName: fullName,
                    icNumber: icNumber,
                    email: email,
                    password: hashedPassword, 
                },
            ])
            .select()
            .single();
        
        if (userPostError) {
            if (userPostError.code && userPostError.code === "23505" && userPostError.message.includes("icNumber")) {
                throw new Error("IC Number already exists. Sign up with a different IC Number.");
            } else if(userPostError.code && userPostError.code === "23505" && userPostError.message.includes("email")) {
                throw new Error("Email already exists. Sign up with a different email.");
            } else {
                throw new Error("Error occurred! Unable to sign up.");
            }
        }

        return userData.userId;
    }

    async function uploadHawkerData(imageUrl, userID) {
        const { data: hawkerData, error: hawkerPostError } = await supabase
            .from("Hawker")
            .insert([
                {
                    userID: userID, // Ensure the correct field name in your database
                    citizenship: citizenship,
                    contactAddress: contactAddress,
                    mobilePhoneNumber: mobilePhoneNumber,
                    birthDate: birthDate,
                    gender: gender,
                    race: race,
                    hawkerImage: imageUrl,
                },
            ])
            .select()
            .single();
            if (hawkerPostError) {
                throw new Error(`Hawker insert error: ${hawkerPostError.message}`);
            }

            return hawkerData.hawkerID;
        }

  return (
    <>
       <section className="mx-48 mt-32">
        <form onSubmit={handleSubmit}>
                <img className="w-36 mb-3" src={HawkTuahLogo} alt="" />
                <div className="flex justify-between">
                    <h1 className="text-[32px] font-bold">Sign Up as Hawker</h1>
                    <div className="flex items-center gap-x-8">
                        <p>Already have an account? <a href="" className="text-blue-600 underline">Login</a> here!</p>
                        <input
                            type="submit"
                            className={`rounded-md py-3 px-16 text-white ${ isSubmitting ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600'}`}
                            value={isSubmitting ? "Submitting..." : "Submit"}
                            disabled={isSubmitting}
                        />
                    </div>
                </div>
                {errors.form && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800 ">{errors.form}</p>}
                <main className="grid grid-cols-2 gap-x-64 ">
                    <div>
                        <div className="flex flex-col mt-5">
                            <label htmlFor="" className="font-semibold">Full Name:</label>
                            <input type="text"  className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" placeholder="John Doe" onChange={(e) => setFullName(e.target.value)} />
                            {errors.fullName && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800 ">{errors.fullName}</p>}
                        </div>
                        <div className="flex flex-col mt-5">
                            <label htmlFor="" className="font-semibold">IC Number: <span className="text-sm text-gray-800 font-normal italic" >e.g: 040221-13-1004</span></label>
                            <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" placeholder="xxxxxx-xx-xxxx"  onChange={(e) => setIcNumber(e.target.value)}  />
                            {errors.icNumber && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800 ">{errors.icNumber}</p>}
                        </div>
                        <div className="flex flex-col mt-5">
                            <label htmlFor="" className="font-semibold">Email:</label>
                            <input type="email" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" placeholder="tim@gmail.com"  onChange={(e) => setEmail(e.target.value)} />
                            {errors.email && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800 ">{errors.email}</p>}
                        </div>
                        <div className="flex flex-col mt-5">
                            <label htmlFor="" className="font-semibold">Password:</label>
                            <input type="password" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1"  onChange={(e) => setPassword(e.target.value)} />
                            {errors.password && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800 ">{errors.password}</p>}
                        </div>
                        <div className="flex flex-col mt-5">
                            <label htmlFor="" className="font-semibold">Citizenship:</label>
                            <select 
                                className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1"
                                onChange={(e) => setCitizenship(e.target.value)}
                            >
                                <option value="" disabled selected>Select Citizenship</option>
                                {citizenshipStatuses.map((status, index) => (
                                    <option key={index} value={status}>{status}</option>
                                ))}
                            </select>

                            {errors.citizenship && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800 ">{errors.citizenship}</p>}
                        </div>
                        <div className="flex flex-col mt-5">
                            <label htmlFor="" className="font-semibold">Contact Address:</label>
                            <input type="text" placeholder="No.1 Jalan Setapak, Bandar Puteri Rimbayu, 45260 J.." className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1"  onChange={(e) => setContactAddress(e.target.value)} />
                            {errors.contactAddress && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800 ">{errors.contactAddress}</p>}
                        </div>
                    </div>
    
                    <div>
                        <div className="flex flex-col mt-5">
                            <label htmlFor="" className="font-semibold">Mobile Phone Number: <span className="text-sm text-gray-800 font-normal italic" >e.g: 60106674248</span></label>
                            <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" placeholder="60106674248"  onChange={(e) => setMobilePhoneNumber(e.target.value)} />
                            {errors.mobilePhoneNumber && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800 ">{errors.mobilePhoneNumber}</p>}
                        </div>
                        <div className="flex flex-col mt-5">
                            <label htmlFor="" className="font-semibold">Birth Date:</label>
                            <input type="date" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" onChange={(e) => setBirthDate(e.target.value)} />
                            {errors.birthDate && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800 ">{errors.birthDate}</p>}
                        </div>
                        
                        <div className="flex flex-col mt-5">
                            <label htmlFor="gender" className="font-semibold">Gender:</label>
                            <select 
                                id="gender" 
                                className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" 
                                onChange={(e) => setGender(e.target.value)}
                                value={gender} // Ensure controlled input
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            {errors.gender && (
                                <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800">
                                    {errors.gender}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col mt-5">
                            <label htmlFor="" className="font-semibold">Race:</label>
                            <select 
                            className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1"
                            onChange={(e) => setRace(e.target.value)}
                            >
                                <option value="" disabled selected>Select Race</option>
                                {races.map((race, index) => (
                                    <option key={index} value={race}>{race}</option>
                                ))}
                            </select>
                            {errors.race && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800 ">{errors.race}</p>}
                        </div>

                        <div className="flex flex-col mt-4">
                            <label htmlFor="" className="font-semibold mb-1">Hawker Image:</label>
                            <BlueFileInput type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4" onChange={handleFileChange} />
                            {errors.hawkerImage && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800">{errors.hawkerImage}</p>}
                        </div>
                    </div>
                </main>
            </form>
        </section> 
    </>
  )
}
