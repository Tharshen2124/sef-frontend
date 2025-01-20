import AdminNavigationBar from "../../components/Admin/AdminNavigationBar"

export default function ManageUserAccountPage() {
    const applications = [
        {
          name: "John Doe",
          contact: "010-667 3148",
          email: "john@gmail.com",
        },
        {
          name: "Steve Irwin", 
          contact: "010-667 3148",
          email: "irwin@gmail.com",
        },
        {
          name: "Steven Bills",
          contact: "010-667 3148", 
          email: "stev3@gmail.com",
        },
        {
          name: "Bruha Johnson",
          contact: "010-667 3148",
          email: "burha@gmail.com",
        },
        {
          name: "Unce McGee",
          contact: "010-667 3148",
          email: "gew@gmail.com",
        }
    ]
    return (
    <>
        <AdminNavigationBar />
            <section className="p-10 mt-10">
            <h1 className="text-2xl font-bold mb-3">Hawker License Application</h1>
            <div className="w-full mx-auto border rounded-lg border-[#e0e0e0] py-16 px-24">
                <table className="w-full">
                    <thead>
                    <tr className="text-left border-b border-[#999]">
                        <th className="py-2 w-[250px]">Full Name</th>
                        <th className="py-2 w-[600px] sm:pl-16 md:pl-24 lg:pl-32 xl:pl-48">Email</th>
                        <th className="py-2 sm:pl-8 lg:pl-4">Contact Number</th>
                        <th className="py-2 w-[100px]"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {applications.map((item, index) => (
                        <tr key={index} className="border-b border-[#e0e0e0]">
                        <td className="py-4">{item.name}</td>
                        <td className="py-6 sm:pl-16 md:pl-24 lg:pl-32 xl:pl-48">{item.email}</td>
                        <td className="py-4 sm:pl-8 lg:pl-4">{item.contact}</td>
                        <td className="py-4 flex gap-x-4 items-center">
                            <a 
                            href="#" 
                            className="text-blue-600 hover:text-blue-800 underline w-[91px] mr-8"
                            >
                            More Details
                            </a>
                            <button className="py-[10px] px-10 bg-blue-600 text-white rounded-md">Edit</button>
                            <button className="py-[10px] px-8 bg-red-500 text-white rounded-md">Delete</button>
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
