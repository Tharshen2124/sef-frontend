import { BlueFileInput } from "../components/General/BlueFileInput";
import HawkTuahLogo from "../assets/hawkTuahLogo.svg"
import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import useAuthStore from "../store/useAuthStore";
import { Navigate } from "react-router-dom";

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
    const [redirect, setRedirect] = useState(false)
    const { setId, setUserType } = useAuthStore.getState()

    const handleFileChange = (file) => setHawkerImage(file); 
    
    const handleSubmitPart1 = async (e) => {
        e.preventDefault();
    
        // Check if the file is valid
        if (!hawkerImage) {
            console.error("No image selected!");
            alert("Please select an image before submitting.");
            return;
        }
    
        console.log({
            fullName,
            icNumber,
            email,
            password,
            citizenship,
            contactAddress,
            mobilePhoneNumber,
            birthDate,
            gender,
            race,
            hawkerImage,
        });
    
        // Upload the image to Supabase storage
        const { data, error } = await supabase
            .storage
            .from("HawkerImage")
            .upload(hawkerImage.name, hawkerImage, {
                cacheControl: "3600",
                upsert: false,
            });
    
        if (error) {
            console.error("Upload Error:", error.message);
            alert("Image upload failed! Please try again.");
            return;
        }
    
        console.log("Uploaded image path:", data.path);
        await handleSubmitPart2(data.path);
    };

    async function handleSubmitPart2(path) {
        try {
            // Get the public URL of the uploaded image
            const { data: imageData, error: imageError } = supabase
                .storage
                .from("HawkerImage")
                .getPublicUrl(path);
    
            if (imageError) throw new Error(`Error fetching image URL: ${imageError.message}`);
            console.log("Image URL:", imageData.publicUrl);
    
            // Insert user into 'User' table
            const { data: userData, error: userPostError } = await supabase
                .from("User")
                .insert([
                    {
                        fullName: fullName,
                        icNumber: icNumber,
                        email: email,
                        password: password, 
                    },
                ])
                .select()
                .single();
    
            if (userPostError) throw new Error(`User insert error: ${userPostError.message}`);
    
            console.log("Inserted User:", userData);
    
            const userId = userData.userId; 
            if (!userId) throw new Error("User ID not found!");
    
            // Insert data into 'Hawker' table
            const { data: hawkerData, error: hawkerPostError } = await supabase
                .from("Hawker")
                .insert([
                    {
                        userID: userId, // Ensure the correct field name in your database
                        citizenship: citizenship,
                        contactAddress: contactAddress,
                        mobilePhoneNumber: mobilePhoneNumber,
                        birthDate: birthDate,
                        gender: gender,
                        race: race,
                        hawkerImage: imageData.publicUrl,
                    },
                ])
                .select()
                .single();
                console.log("Hawker Data", hawkerData.hawkerID)
  
            if (hawkerPostError) {
                throw new Error(`Hawker insert error: ${hawkerPostError.message}`);
            } else {
                const hawkerID = hawkerData.hawkerID
                setId(hawkerID)
                setUserType("hawker")
                alert("Successfully signed up!")
                setRedirect(true)
            }
            
        } catch (error) {
            console.error(error.message);
            alert(`An error occurred: ${error.message}`);
        }
    }
    
    if(redirect) {
        return <Navigate to="/hawker/dashboard" replace />
    }

  return (
    <>
       <section className="mx-48 mt-32">
        <form onSubmit={handleSubmitPart1}>
                    <img src={HawkTuahLogo} alt="" />
                   <div className="flex justify-between">
                       <h1 className="text-[32px] font-bold">Sign Up as Hawker</h1>
                       <div className="flex items-center gap-x-8">
                            <p>Already have an account? <a href="" className="text-blue-600 underline">Login</a> here!</p>
                            <input type="submit" className="bg-blue-600 rounded-md py-3 px-16 text-white" />
                       </div>
                   </div>
                   <main className="grid grid-cols-2 gap-x-64 ">
                       <div>
                           <div className="flex flex-col mt-5">
                               <label htmlFor="" className="font-semibold">Full Name:</label>
                               <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" onChange={(e) => setFullName(e.target.value)}/>
                           </div>
                           <div className="flex flex-col mt-5">
                               <label htmlFor="" className="font-semibold">IC Number:</label>
                               <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1"  onChange={(e) => setIcNumber(e.target.value)} />
                           </div>
                           <div className="flex flex-col mt-5">
                               <label htmlFor="" className="font-semibold">Email:</label>
                               <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1"  onChange={(e) => setEmail(e.target.value)}/>
                           </div>
                           <div className="flex flex-col mt-5">
                               <label htmlFor="" className="font-semibold">Password:</label>
                               <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1"  onChange={(e) => setPassword(e.target.value)}/>
                           </div>
                           <div className="flex flex-col mt-5">
                               <label htmlFor="" className="font-semibold">Citizenship:</label>
                               <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1"  onChange={(e) => setCitizenship(e.target.value)} />
                           </div>
                           <div className="flex flex-col mt-5">
                               <label htmlFor="" className="font-semibold">Contact Address:</label>
                               <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1"  onChange={(e) => setContactAddress(e.target.value)}/>
                           </div>
                       </div>
       
                       <div>
                           <div className="flex flex-col mt-5">
                               <label htmlFor="" className="font-semibold">Mobile Phone Number:</label>
                               <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1"  onChange={(e) => setMobilePhoneNumber(e.target.value)}/>
                           </div>
                           <div className="flex flex-col mt-5">
                               <label htmlFor="" className="font-semibold">Birth Date:</label>
                               <input type="date" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" onChange={(e) => setBirthDate(e.target.value)}/>
                           </div>
                           <div className="flex flex-col mt-5">
                               <label htmlFor="" className="font-semibold">Gender:</label>
                               <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1"  onChange={(e) => setGender(e.target.value)} />
                           </div>
                           <div className="flex flex-col mt-5">
                               <label htmlFor="" className="font-semibold">Race:</label>
                               <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1"  onChange={(e) => setRace(e.target.value)}/>
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
