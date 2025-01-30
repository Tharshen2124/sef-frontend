import HLMNavigationBar from "../../components/HLM/NavigationBarHLM";

export default function HLMHawkerMoreDetailsPage() {
  return (
    <>
    <AdminNavigationBar />
    <section className="p-10">
            <div className="mb-5 text-[12px]">
                <a href="" className="text-blue-600 hover:underline">Inspection Reports</a>
                <span className="text-blue-600"> {">"} </span>
                <a href="" className="text-blue-600 hover:underline">More Info</a>
            </div>
            <div className="flex justify-between items-center">
                <h1 className="py-2 px-4 bg-[#DEE9FC] rounded-lg">
                    <span className="font-bold">Hawker Business Name:</span> 
                </h1>
                <button className="py-[10px] px-8 bg-red-500 text-white rounded-md">Issue Penalty</button>
            </div>  
            
            <h2 className="text-xl font-bold mt-6">Hawker Details</h2>
            <div className="mt-2 border border-[#e0e0e0] rounded-lg grid grid-cols-2 py-8 px-16">
                <div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Phone Number:</label>
                        <p className="text-[#555]">Initial application</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Operation Hours:</label>
                        <p className="text-[#555]">Initial application</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Full Name:</label>
                        <p className="text-[#555]">Initial application</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">IC Number:</label>
                        <p className="text-[#555]">Initial application</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Email:</label>
                        <p className="text-[#555]">Initial application</p>
                    </div>
                </div>
                <div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Birth Date:</label>
                        <p className="text-[#555]">Initial application</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Gender:</label>
                        <p className="text-[#555]">Initial application</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Race:</label>
                        <p className="text-[#555]">Initial application</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Hawker Photo:</label>
                        <p>
                            <a href="#" className="text-blue-600 underline font-semibold">Photo Link</a>
                        </p>                    
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Address:</label>
                        <p className="text-[#555]">Initial application</p>
                    </div>
                </div>
            </div>
            
            {/** LICENSE APPLICATION PART */}

            <h2 className="text-xl font-bold mt-6">License Application Details</h2>
            <div className="mt-2 border border-[#e0e0e0] rounded-lg grid grid-cols-2 py-8 px-16">
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
                        <label htmlFor="" className="font-semibold">Business Type:</label>
                        <p className="text-[#555]">Initial application</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Business Start Time:</label>
                        <p className="text-[#555]">Initial application</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Contact Number:</label>
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
                            <a href="#" className="text-blue-600 underline font-semibold">Photo Link</a>
                        </p>                    
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Payment Proof {"(RM 1000)"}:</label>
                        <p>
                            <a href="#" className="text-blue-600 underline font-semibold">Photo Link</a>
                        </p>                    
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Food Handling Certificate:</label>
                        <p>
                            <a href="#" className="text-blue-600 underline font-semibold">Photo Link</a>
                        </p>       
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Typhoid Injection Card:</label>
                        <p>
                            <a href="#" className="text-blue-600 underline font-semibold">Photo Link</a>
                        </p>       
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Business Experience:</label>
                        <p className="text-[#555]">Initial application</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Food Type:</label>
                        <p className="text-[#555]">Initial application</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Business End Time:</label>
                        <p className="text-[#555]">Initial application</p>
                    </div>
                </div>
            </div>

            {/* PENALTIES SECTION */}
            <h2 className="text-xl font-bold mt-6">Penalties</h2>
            <div className="mt-2 border border-[#e0e0e0] rounded-lg grid grid-cols-2 py-8 px-16">
                <div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Penalty Amount:</label>
                        <p className="text-[#555]">Initial application</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Violation Type:</label>
                        <p className="text-[#555]">Initial application</p>
                    </div>
                </div>
                <div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Created at:</label>
                        <p className="text-[#555]">Initial application</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Penalty Document:</label>
                        <p>
                            <a href="#" className="text-blue-600 underline font-semibold">Photo Link</a>
                        </p>                    
                    </div>        
                </div>
            </div>
    </section>
    </>
  )
}
