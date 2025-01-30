import HLMNavigationBar from "../../components/HLM/NavigationBarHLM";

export default function ManageHawkerAccountPage() {
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
            <a href="" className="text-blue-600 hover:underline">Manage Accounts</a>
                <span className="text-blue-600"> {">"} </span>
            <a href="" className="text-blue-600 hover:underline">Edit Details</a>
        </div>
        <h1 className="text-2xl font-bold mb-3">Manage Hawker Accounts</h1>
        <div className="w-full mx-auto border rounded-lg border-[#e0e0e0] py-16 px-24">
        <table className="w-full">
            <thead>
            <tr className="text-left border-b border-[#999]">
                <th className="py-2 w-[250px]">Full Name</th>
                <th className="py-2 w-[600px] sm:pl-16 md:pl-24 lg:pl-32 xl:pl-48">Email</th>
                <th className="py-2 w-[100px]"></th>
            </tr>
            </thead>
            <tbody>
            {applications.map((item, index) => (
                <tr key={index} className="border-b border-[#e0e0e0]">
                <td className="py-4">{item.name}</td>
                <td className="py-6 sm:pl-16 md:pl-24 lg:pl-32 xl:pl-48">{item.contact}</td>
                <td className="py-4 flex gap-x-4 items-center">
                    <a 
                    href="#" 
                    className="text-blue-600 hover:text-blue-800 underline w-[91px] mr-8"
                    >
                    More Details
                    </a>
                    <button className="py-[10px] px-6 bg-blue-600 text-white rounded-md">Edit</button>
                    <button className="py-[10px] px-6 bg-red-500 text-white rounded-md">Delete</button>
                    <button className="py-[10px] px-6 bg-gray-700 text-white rounded-md">Issue Penalty</button>
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