import { useEffect, useState } from "react";
import AdminNavigationBar from "../../components/Admin/AdminNavigationBar";
import { BlueFileInput } from "../../components/General/BlueFileInput";
import useAuthStore from "../../store/useAuthStore";
import { supabase } from "../../utils/supabaseClient";
import { Navigate } from "react-router-dom";

export default function EditProfilePage() {
    const { id: hawkerId, userType } = useAuthStore(); 
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [data, setData] = useState()
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
    const [userID, setUserID] = useState();
    const [redirectIfSuccess, setRedirectIfSuccess] = useState(false)

    const handleFileChange = (file) => setHawkerImage(file); 

    useEffect(() => {
        if (userType !== 'hawker') {
            setShouldRedirect(true);
        }
    }, [userType]);  

    if (shouldRedirect) {
        return <Navigate to="/" replace />;
    } 

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
                setData(data);
                setUserID(data.User.userId);
    
                setFullName(data.User.fullName || "");
                setIcNumber(data.User.icNumber || "");
                setEmail(data.User.email || "");
                setPassword(data.User.password || "");
                setCitizenship(data.citizenship || "");
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
        const imageUrl = await uploadImage()

        const { error: userPostError } = await supabase
        .from("User")
        .update([
            {
                fullName: fullName,
                icNumber: icNumber,
                email: email,
                password: password, 
            },
        ])
        .eq('userId', userID)

        if (userPostError) {
            alert("Error occured, cannot update user's info")
            console.log(`User update info error: ${userPostError.message}`)
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
        } else {
            alert("Successfully updated profile details")
            setRedirectIfSuccess(true)
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

    if(redirectIfSuccess) {
        return <Navigate to="/hawker/dashboard" replace />
    }

  return (
    <>
        <AdminNavigationBar />
        <section className="p-10">
            <div className="mb-5 text-[12px]">
                <a href="" className="text-blue-600 hover:underline">Dashboard</a>
                <span> {">"} </span>
                <a href="" className="text-blue-600 hover:underline">Profile</a>
                <span> {">"} </span>
                <a href="" className="text-blue-600 hover:underline">Edit Profile</a>
            </div>
            <form action="" onSubmit={handleSubmit}>
            <div className="flex justify-between max-w-[1200px]">
                <h1 className="text-[32px] font-bold">Edit Profile</h1>
                <input type="submit" className="bg-blue-600 rounded-md py-3 px-16 text-white" /> 
            </div>
            <main className="grid grid-cols-2 gap-x-64 max-w-[1200px]">
                <div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Full Name:</label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" onChange={(e) => setFullName(e.target.value)} value={fullName } />
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">IC Number:</label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" onChange={(e) => setIcNumber(e.target.value)} value={icNumber} />
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Email:</label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" onChange={(e) => setEmail(e.target.value)} value={email} />
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Password:</label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" onChange={(e) => setPassword(e.target.value)} value={password} />
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Citizenship:</label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" onChange={(e) => setCitizenship(e.target.value)} value={citizenship}/>
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Contact Address:</label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" onChange={(e) => setContactAddress(e.target.value)} value={contactAddress}/>
                    </div>
                </div>

                <div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Mobile Phone Number:</label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" onChange={(e) => setMobilePhoneNumber(e.target.value)} value={mobilePhoneNumber}/>
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Birth Date:</label>
                        <input type="date" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" onChange={(e) => setBirthDate(e.target.value)} value={birthDate}/>
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Gender:</label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" onChange={(e) => setGender(e.target.value)} value={gender}/>
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Race:</label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" onChange={(e) => setRace(e.target.value)} value={race}/>
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
