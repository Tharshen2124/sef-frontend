import { CirclePlus } from "lucide-react";
import AdminNavigationBar from "../../components/Admin/AdminNavigationBar";

export default function HLMInspectionReportPage() {
    const applications = [
        {
          name: "Hawker A",
          contact: "010-667 3148",
          foodType: "Yong Tau Foo",
        },
        {
          name: "Hawker B", 
          contact: "010-667 3148",
          foodType: "Curry Laksa",
        },
        {
          name: "Hawker C",
          contact: "010-667 3148", 
          foodType: "Tom Yam",
        },
        {
          name: "Hawker D",
          contact: "010-667 3148",
          foodType: "Asian",
        },
        {
          name: "Hawker E",
          contact: "010-667 3148",
          foodType: "Middle Eastern",
        }
      ]
  return (
    <>
    <AdminNavigationBar />
            <section className="p-10">
            <div className="mb-5 text-[12px]">
                    <a href="" className="text-blue-600 hover:underline">Dashboard</a>
                    <span> {">"} </span>
                    <a href="" className="text-blue-600 hover:underline">Renew License</a>
                </div>
            <div className="flex justify-between mb-5 items-center">
            <h1 className="text-2xl font-bold">Inspection Reports</h1>
                <button className="flex items-center py-3 px-5 bg-blue-600 rounded-lg text-white gap-x-[6px]">
                    <CirclePlus />
                    New Inspection
                </button>
            </div>
            <div className="w-full mx-auto border rounded-lg border-[#e0e0e0] py-16 px-24">
            <table className="w-full">
                <thead>
                <tr className="text-left border-b border-[#999]">
                    <th className="py-2">Hawker Name</th>
                    <th className="py-2 lg:pl-16">Inspection Date</th>
                    <th className="py-2">Inspection Time</th>
                    <th className="py-2 w-[150px]"></th>
                </tr>
                </thead>
                <tbody>
                {applications.map((item, index) => (
                    <tr key={index} className="border-b border-[#e0e0e0]">
                    <td className="py-4">{item.name}</td>
                    <td className="py-6 lg:pl-16">{item.contact}</td>
                    <td className="py-4 ">{item.foodType}</td>
                    <td className="py-4 gap-x-4">
                        <a 
                        href="#" 
                        className="text-blue-600 hover:text-blue-800 underline w-[91px] mr-8"
                        >
                        More Details
                        </a>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
            </section>
    </>
  )
}
