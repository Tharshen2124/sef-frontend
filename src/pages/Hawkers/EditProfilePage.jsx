import AdminNavigationBar from "../../components/Admin/AdminNavigationBar";
import { BlueFileInput } from "../../components/General/BlueFileInput";

export default function EditProfilePage() {
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
            <div className="flex justify-between max-w-[1200px]">
                <h1 className="text-[32px] font-bold">Edit Profile</h1>
                <button className="bg-blue-600 rounded-md py-3 px-16 text-white">Submit</button>
            </div>
            <main className="grid grid-cols-2 gap-x-64 max-w-[1200px]">
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
