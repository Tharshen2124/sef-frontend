import HLMNavigationBar from "../../components/HLM/NavigationBarHLM";
import { BlueFileInput } from "../../components/General/BlueFileInput";

export default function EditHawkerDetailsPage() {
  return (
    <>
        <AdminNavigationBar />
        <section className="p-10">
            <div className="mb-5 text-[12px]">
                <a href="" className="text-blue-600 hover:underline">Manage Accounts</a>
                <span className="text-blue-600"> {">"} </span>
                <a href="" className="text-blue-600 hover:underline">Edit Details</a>
            </div>
            <div className="flex justify-between max-w-[1400px]">
                <h1 className="text-[32px] font-bold">Edit Hawker Details</h1>
                <button className="bg-blue-600 rounded-md py-3 px-16 text-white">Submit</button>
            </div>
            <main className="grid grid-cols-2 gap-x-64 max-w-[1400px]">
                <div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Contact Address:</label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Mobile Phone Number:</label>
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
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Citizenship:</label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Employment Status:</label>
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
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Business Experience:</label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Food Type:</label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                    </div>
                </div>

                <div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Birth Date: </label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Bank Account Number: </label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Bank Holder Name: </label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Bank Name: </label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Household Income: </label>
                        <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Hawker Image:</label>
                        <BlueFileInput type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4" />
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="" className="font-semibold">Passport Photo:</label>
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
                </div>
            </main>
        </section>
    </>
  )
}
