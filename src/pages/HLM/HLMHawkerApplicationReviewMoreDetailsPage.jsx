import AdminNavigationBar from "../../components/Admin/AdminNavigationBar";

export default function HLMHawkerApplicationReviewMoreDetailsPage() {
  return (
    <>
    <AdminNavigationBar />
    <section className="p-10">
            <div className="mb-5 text-[12px]">
                <a href="" className="text-blue-600 hover:underline">Hawker Application</a>
                <span className="text-blue-600"> {">"} </span>
                <a href="" className="text-blue-600 hover:underline">More Details</a>
            </div>
            <div className="flex justify-between items-center">
                <h1 className="py-2 px-4 bg-[#DEE9FC] rounded-lg">
                    <span className="font-bold">Hawker Business Name:</span> 
                </h1>
                <div className="flex items-center gap-x-2">
                    <button className="py-[10px] px-8 bg-green-500 text-white rounded-md">Accept</button>
                    <button className="py-[10px] px-8 bg-red-500 text-white rounded-md">Delete</button>
                </div>
            </div>  
            <div className="mt-4 border border-[#e0e0e0] rounded-lg grid grid-cols-2 py-8 px-16">
                <div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Type of Application:</label>
                        <p className="text-[#555]">Initial application</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Bank Account Number:</label>
                        <p className="text-[#555]">Initial application</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Bank Name:</label>
                        <p className="text-[#555]">Initial application</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Bank Holder Name:</label>
                        <p className="text-[#555]">Initial application</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Employment Status:</label>
                        <p className="text-[#555]">Initial application</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Household Income:</label>
                        <p className="text-[#555]">Initial application</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Owner Name:</label>
                        <p className="text-[#555]">Initial application</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Business Type:</label>
                        <p className="text-[#555]">Initial application</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Business Start Time:</label>
                        <p className="text-[#555]">Initial application</p>
                    </div>
                </div>
                <div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Location Plan:</label>
                        <p className="text-[#555]">Initial application</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Passport Photo:</label>
                        <p>
                            <a href="#" className="text-blue-600 underline font-semibold">Initial application</a>
                        </p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Payment Proof {"(RM 1000)"}</label>
                        <p>
                            <a href="#" className="text-blue-600 underline font-semibold">Initial application</a>
                        </p>                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Food Handling Certificate: </label>
                        <p>
                            <a href="#" className="text-blue-600 underline font-semibold">Initial application</a>
                        </p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Typhoid Injection Card:</label>
                        <p>
                            <a href="#" className="text-blue-600 underline font-semibold">Initial application</a>
                        </p>                    
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Business Experience</label>
                        <p className="text-[#555]">Initial application</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Food Type:</label>
                        <p className="text-[#555]">Initial application</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Business End TIme:</label>
                        <p className="text-[#555]">Initial application</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Contact Number:</label>
                        <p className="text-[#555]">Initial application</p>
                    </div>
                </div>
            </div>
    </section>
    </>
  )
}
