import { useEffect, useState } from "react";
import { BlueFileInput } from "../../components/General/BlueFileInput";
import useAuthStore from "../../store/useAuthStore";
import { supabase } from "../../utils/supabaseClient";
import { useNavigate } from "react-router-dom";
import { citizenshipStatuses } from "../../utils/citizenshipStatuses";
import { races } from "../../utils/races";
import { hashPassword } from "../../utils/hashPassword";
import HawkerNavigationBar from "../../components/Hawkers/HawkerNavigationBar";

export default function EditProfilePage() {
    const { id: hawkerId, userType } = useAuthStore(); 
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
    const [userID, setUserID] = useState();
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

    const handleFileChange = (file) => setHawkerImage(file); 

    useEffect(() => {
        async function getData() {
            const { data, error } = await supabase
                .from("Hawker")
                .select(`
                    hawkerID,
                    contactAddress,
                    mobilePhoneNumber,
                    birthDate,
                    gender,
                    race,
                    citizenship,
                    User ( userId, fullName, email, icNumber, password )
                `)
                .eq("hawkerID", hawkerId) // Filter by hawkerId
                .single(); // Expect only one record
    
            if (error) {
                console.error("Error fetching data:", error.message);
            } else {
                setUserID(data.User.userId);
                setCitizenship(data.citizenship || "");
                setFullName(data.User.fullName || "");
                setIcNumber(data.User.icNumber || "");
                setEmail(data.User.email || "");
                setContactAddress(data.contactAddress || "");
                setMobilePhoneNumber(data.mobilePhoneNumber || "");
                setBirthDate(data.birthDate || "");
                setGender(data.gender || "");
                setRace(data.race || "");
            }
        }
        
        getData();
    }, [hawkerId]); // Run when `hawkerId` changes
    
    async function handleSubmit(e) {
        e.preventDefault();

        console.log("Submitting form...");

        setIsSubmitting(true);

        const validationErrors = validateForm()
        setErrors(validationErrors)
        if (Object.values(validationErrors).some(error => error !== "")) {
            setIsSubmitting(false);
            return; // Stop submission if there are errors
        }

        const imageUrl = await uploadImage()

        const hashedPassword = await hashPassword(password)

        const { error: userPostError } = await supabase
        .from("User")
        .update([
            {
                fullName: fullName,
                icNumber: icNumber,
                email: email,
                password: hashedPassword, 
            },
        ])
        .eq('userId', userID)

        if (userPostError) {
            alert("Error occured, cannot update user's info")
            console.log(`User update info error: ${userPostError.message}`)
            setIsSubmitting(false)
            return
        }

        const { error: hawkerPostError } = await supabase
        .from("Hawker")
        .update([
            {
                citizenship: citizenship,
                contactAddress: contactAddress,
                mobilePhoneNumber: mobilePhoneNumber,
                birthDate: birthDate,
                gender: gender,
                race: race,
                hawkerImage: imageUrl,
            },
        ])
        .eq('hawkerID', hawkerId)

        if (hawkerPostError) {
            alert("Error occured, cannot update user's info")
            console.log(`User update info error: ${userPostError.message}`)
            setIsSubmitting(false)
        } else {
            setIsSubmitting(false)
            alert("Successfully updated profile details")
            navigate("/hawker/profile")
        }
    }

    async function uploadImage() {
        const { data: uploadData, error: uploadError } = await supabase
            .storage
            .from('HawkerImage')
            .upload(hawkerImage.name, hawkerImage, {
                cacheControl: '3600',
                upsert: false,
            });

        if(uploadError) {
            console.error("error occured", uploadError);
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

    function validateForm() {
        let newErrors = { 
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
        };

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

  return (
    <>
        <HawkerNavigationBar />
        <section className="p-10">
            <div className="mb-5 text-[12px]">
                <a href="/hawker/dashboard" className="text-blue-600 hover:underline">Dashboard</a>
                <span> {">"} </span>
                <a href="/hawker/profile/" className="text-blue-600 hover:underline">Profile</a>
                <span> {">"} </span>
                <a href="/hawker/profile/edit" className="text-blue-600 hover:underline">Edit Profile</a>
            </div>
            <form action="" onSubmit={handleSubmit}>
            <div className="flex justify-between max-w-[1200px]">
                <h1 className="text-[32px] font-bold">Edit Profile</h1>
                <input
                    type="submit"
                    className={`hover:bg-blue-700 active:bg-blue-800 rounded-md py-3 px-16 text-white ${ isSubmitting ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600'}`}
                    value={isSubmitting ? "Submitting..." : "Submit"}
                    disabled={isSubmitting}
                />
            </div>
            <main className="grid grid-cols-2 gap-x-64 max-w-[1200px]">
                <div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Full Name:</label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" onChange={(e) => setFullName(e.target.value)} value={fullName } />
                        {errors.fullName && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800 ">{errors.fullName}</p>}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">IC Number:</label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" onChange={(e) => setIcNumber(e.target.value)} value={icNumber} />
                        {errors.icNumber && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800 ">{errors.icNumber}</p>}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Email:</label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" onChange={(e) => setEmail(e.target.value)} value={email} />
                        {errors.email && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800 ">{errors.email}</p>}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Password:</label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" onChange={(e) => setPassword(e.target.value)} value={password} />
                        {errors.password && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800 ">{errors.password}</p>}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Citizenship:</label>
                        <select 
                            className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1"
                            onChange={(e) => setCitizenship(e.target.value)}
                            value={citizenship}
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
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" onChange={(e) => setContactAddress(e.target.value)} value={contactAddress}/>
                        {errors.contactAddress && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800 ">{errors.contactAddress}</p>}
                    </div>
                </div>

                <div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Mobile Phone Number:</label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" onChange={(e) => setMobilePhoneNumber(e.target.value)} value={mobilePhoneNumber}/>
                        {errors.mobilePhoneNumber && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800 ">{errors.mobilePhoneNumber}</p>}
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Birth Date:</label>
                        <input type="date" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" onChange={(e) => setBirthDate(e.target.value)} value={birthDate}/>
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
                            <option value="" disabled selected>Select Gender</option>
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
                            value={race}
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
                        <BlueFileInput type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4" onChange={handleFileChange}/>
                    </div>
                </div>
            </main>
            </form>
        </section>
    </>
  )
}
