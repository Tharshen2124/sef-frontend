import { BlueFileInput } from "../components/General/BlueFileInput";
import HawkTuahLogo from "../assets/hawkTuahLogo.svg"

export default function HawkerSignUpPage() {
  return (
    <>
       <section className="mx-48 mt-32">
                    <img src={HawkTuahLogo} alt="" />
                   <div className="flex justify-between">
                       <h1 className="text-[32px] font-bold">Sign Up as Hawker</h1>
                       <div className="flex items-center gap-x-8">
                            <p>Already have an account? <a href="" className="text-blue-600 underline">Login</a> here!</p>
                            <button className="bg-blue-600 rounded-md py-3 px-16 text-white">Submit</button>
                       </div>
                   </div>
                   <main className="grid grid-cols-2 gap-x-64 ">
                       <div>
                           <div className="flex flex-col mt-5">
                               <label htmlFor="" className="font-semibold">Full Name:</label>
                               <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                           </div>
                           <div className="flex flex-col mt-5">
                               <label htmlFor="" className="font-semibold">IC Number:</label>
                               <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                           </div>
                           <div className="flex flex-col mt-5">
                               <label htmlFor="" className="font-semibold">Email:</label>
                               <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                           </div>
                           <div className="flex flex-col mt-5">
                               <label htmlFor="" className="font-semibold">Password:</label>
                               <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                           </div>
                           <div className="flex flex-col mt-5">
                               <label htmlFor="" className="font-semibold">Citizenship:</label>
                               <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                           </div>
                           <div className="flex flex-col mt-5">
                               <label htmlFor="" className="font-semibold">Contact Address:</label>
                               <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                           </div>
                       </div>
       
                       <div>
                           <div className="flex flex-col mt-5">
                               <label htmlFor="" className="font-semibold">Mobile Phone Number:</label>
                               <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                           </div>
                           <div className="flex flex-col mt-5">
                               <label htmlFor="" className="font-semibold">Birth Date:</label>
                               <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                           </div>
                           <div className="flex flex-col mt-5">
                               <label htmlFor="" className="font-semibold">Gender:</label>
                               <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                           </div>
                           <div className="flex flex-col mt-5">
                               <label htmlFor="" className="font-semibold">Race:</label>
                               <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                           </div>
                           <div className="flex flex-col mt-4">
                               <label htmlFor="" className="font-semibold mb-1">Hawker Image:</label>
                               <BlueFileInput type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4" />
                        </div>
                    </div>
            </main>
        </section> 
    </>
  )
}
