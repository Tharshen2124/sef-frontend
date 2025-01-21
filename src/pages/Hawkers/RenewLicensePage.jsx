import { BlueFileInput } from "../../components/General/BlueFileInput";
import HawkerNavigationBar from "../../components/Hawkers/HawkerNavigationBar";

export default function RenewLicensePage() {
  return (
    <>
    <HawkerNavigationBar />
    <section className="p-10">
                <div className="mb-5 text-[12px]">
                    <a href="" className="text-blue-600 hover:underline">Dashboard</a>
                    <span> {">"} </span>
                    <a href="" className="text-blue-600 hover:underline">Renew License</a>
                </div>
    
                <div className="flex flex-col mx-auto w-[530px] p-4 rounded-lg">
                    <h1 className="text-2xl font-bold text-center">Renew License</h1>
                    
                    <div className="flex flex-col mt-8">
                        <label htmlFor="" className="font-semibold">Location Plan:</label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                    </div>
    
                    <div className="flex flex-col mt-6">
                        <label htmlFor="" className="font-semibold">Passport Photo:  </label>
                        <BlueFileInput type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                    </div>
                    <div className="flex flex-col mt-6">
                        <label htmlFor="" className="font-semibold">Payment Proof:</label>
                        <BlueFileInput type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                    </div>
    
                    <div className="flex flex-col mt-6">
                        <label htmlFor="" className="font-semibold">Food Handling Certificate: </label>
                        <BlueFileInput type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                    </div>
                    <div className="flex flex-col mt-6">
                        <label htmlFor="" className="font-semibold">Typhoid Injection Card:</label>
                        <BlueFileInput type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                    </div>
                    <button className="bg-blue-600 py-3 text-white font-semibold mt-16 rounded-md">Submit</button>
    
                </div>
            </section>
    </>
  )
}
