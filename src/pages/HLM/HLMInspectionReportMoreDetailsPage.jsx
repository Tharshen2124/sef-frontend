import HLMNavigationBar from "../../components/HLM/NavigationBarHLM";

export default function HLMInspectionReportMoreDetailsPage() {
  return (
    <>
    <HLMNavigationBar />
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
            </div>  
            <div className="mt-4 border border-[#e0e0e0] rounded-lg grid grid-cols-2 py-8 px-16">
                <div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Inspection Date:</label>
                        <p className="text-[#555]">Initial application</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Inspection Time:</label>
                        <p className="text-[#555]">Initial application</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Outcome:</label>
                        <p className="text-[#555]">Initial application</p>
                    </div>
                    
                </div>
                <div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Inspection Photos:</label>
                        <p>
                            <a href="#" className="text-blue-600 underline font-semibold">Photo Link</a>
                        </p>                    
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Rating:</label>
                        <p className="text-[#555]">Initial application</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Recommendation:</label>
                        <p className="text-[#555]">Initial application</p>
                    </div>
                </div>
            </div>
    </section>
    </>
  )
}
