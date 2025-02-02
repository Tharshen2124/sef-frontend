import NavigationBar from "../../components/Hawkers/HawkerNavigationBar";
import { BlueFileInput } from "../../components/General/BlueFileInput";

export default function ApplyForLicensePage() {
  return (
    <>
        <NavigationBar />
        <section className="p-10">
            <div className="mb-5 text-[12px]">
                <a href="" className="text-blue-600 hover:underline">Dashboard</a>
                <span> {">"} </span>
                <a href="" className="text-blue-600 hover:underline">Apply License</a>
            </div>
            <div className="flex justify-between max-w-[1200px]">
                <h1 className="text-[32px] font-bold">Apply For License</h1>
                <button className="bg-blue-600 rounded-md py-3 px-16 text-white">Submit</button>
            </div>
            <main className="grid grid-cols-2 gap-x-64 max-w-[1200px]">
                <div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Bank Account Number:</label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Bank Name:</label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Bank Holder Name:</label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Employment Status:</label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Household Income:</label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Business Name:</label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Business Type:</label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Business Start Time:</label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Business End Time:</label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                    </div>
                </div>

                <div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Location Plan: </label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Passport Photo: </label>
                        <BlueFileInput type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4" />
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Payment Proof {"(RM 1000)"}:</label>
                        <BlueFileInput type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4" />
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Food Handling Certificate:</label>
                        <BlueFileInput type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4" />
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold mb-1">Typhoid Injection Card:</label>
                        <BlueFileInput type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4" />
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Business Experience:</label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Food Type:</label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                    </div>
                </div>
            </main>
        </section>
    </>
  )
}
