import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { checkPassword, hashPassword } from "../utils/hashPassword";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const [icNumber, setIcNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setId, setUserType } = useAuthStore.getState()
  const [userData, setUserData] = useState()
  const [userType, setUserTypeState] = useState("");

  useEffect(() => {
    if (userData && userType) {
      handleNavigation(userData, userType);
    }
  }, [userData, userType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!icNumber || !password) {
      setError("IC Number and Password are required");
      return;
    }

    try {
      const { data: user, error } = await supabase
        .from("User")
        .select("*")
        .eq("icNumber", icNumber)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          setError("Data not found. Please check your IC Number.");
        } else {
          console.error("Unexpected error occurred:", error.message);
          setError("An unexpected error occurred. Please try again later.");
        }
        return;
      }

      const result = await checkPassword(password, await hashPassword(user.password));

      if (!result) {
        setError("Invalid password. Please try again.");
        return;
      }

      setError("");

      // Get user type without waiting for setUserData
      const userTypeFound = await getUserType(user.userId);

      if (!userTypeFound) {
        setError("User type not found. Please contact support.");
        return;
      }

      setUserTypeState(userTypeFound);
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  const getUserType = async (userId) => {
    const tables = ["Hawker", "PublicUser", "SystemAdmin", "HawkerLicenseManager"];

    for (const table of tables) {
      const { data: user, error } = await supabase
        .from(table)
        .select()
        .eq("userID", userId)
        .single();

      if (user) {
        setUserData(user);
        return table;
      }
    }
    return null;
  };

  const handleNavigation = (user, userType) => {
    switch (userType) {
      case "Hawker":
        setId(user.hawkerID);
        setUserType("hawker");
        navigate("/hawker/dashboard");
        break;
      case "PublicUser":
        setId(user.publicUserID);
        setUserType("publicuser");
        navigate("/publicuser/hawkers");
        break;
      case "SystemAdmin":
        setId(user.systemAdminID);
        setUserType("admin");
        navigate("/admin/dashboard");
        break;
      case "HawkerLicenseManager":
        setId(user.hawkerLicenseManagerID);
        setUserType("hlm");
        navigate("/license-manager/dashboard");
        break;
      default:
        setError("User type not found. Please contact support.");
        break;
    }
  };
  
  return (
    <>
        <div className=" flex justify-center items-center h-screen">
        <div className="w-1/2 h-screen hidden lg:block relative">
          <img
            src="/loginImage.jpg"
            alt="Placeholder Image"
            className="object-cover w-full h-full"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-blue-500 opacity-50"></div>
          {/* Text */}
          <div className="absolute bottom-10 left-24 right-0 p-8 text-center text-white">
            <p className="text-2xl font-bold italic text-left">
              "A diligent hawker today, can be a great 
            </p>
            <p className="text-2xl font-bold italic mb-2 text-left">
            tycoon tomorrow."
            </p>
            <p className="text-sm text-left">- Ernest Agyemang Yeboah</p>
          </div>
        </div>


            <div className= "lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                <div className="h-8 mb-5">
                    {error && (
                      <p className="py-2 px-4 border-2 border-red-500 bg-red-200 text-red-800 rounded-[4px]">
                        {error}
                      </p>
                    )}
                </div>
                <h1 className="text-4xl font-semibold mb-10">Welcome Back!</h1>
                <form action="#" onSubmit={handleSubmit}>
                    <div className="mb-4 ">
                    <label htmlFor="username" className="block text-[#333] font-semibold mb-1">IC Number:</label>
                    <input onChange={(e) => setIcNumber(e.target.value)} type="text" className="transition w-full border border-gray-200 rounded-md py-2 px-3 focus:outline-none outline-2 focus:outline-blue-500" />
                    </div>
                    
                    <div className="mb-4">
                    <label htmlFor="password" className="block text-[#333] font-semibold mb-1">Password:</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" className="transition w-full border border-gray-200 rounded-md py-2 px-3 focus:outline-none outline-2 focus:outline-blue-500"/>
                    </div>
                
                    <div className="mb-6">
                    Don’t have an account? Sign up <a href="/account-selection" className="text-blue-500 hover:underline">here</a>!
                    </div>
                    
                    <button type="submit" className="transition bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md py-3 px-4 w-full">Login</button>
                </form>
            </div>
        </div>
    </>
  )
}
