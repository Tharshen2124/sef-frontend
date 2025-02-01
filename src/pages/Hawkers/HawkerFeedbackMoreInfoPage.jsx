import NavigationBar from "../../components/Hawkers/HawkerNavigationBar";

export default function HawkerFeedbackMoreInfoPage() {
    return (
        <>
            <NavigationBar />
            <section className="p-10">
                        <div className="mb-5 text-[12px]">
                            <a href="/hawker/dashboard" className="text-blue-600 hover:underline">Hawker</a>
                            <span> {">"} </span>
                            <a href="" className="text-blue-600 hover:underline">Submit Feedback</a>
                        </div>
            
                        <div className="border border-[#e0e0e0]  flex flex-col mx-auto w-[550px] px-12 py-10 rounded-lg">
                            <h1 className="text-2xl font-bold text-center">Feedback by</h1>
                            <h3 className="text-[#555] font-semibold text-center">John Doe</h3>
                            
                            <div className="mt-8">
                                <h4 className="font-semibold">Title</h4>
                                <p className="text-[#333] text-[14px]">Terrible food service</p>
                            </div>
    
                            <div className="mt-4">
                                <h4 className="font-semibold">Description</h4>        
                                <p className="text-[#333] text-[14px] text-justify">The service at this restaurant was abysmal. We waited an eternity for our food, the staff were inattentive and unapologetic about the delays, and our orders were consistently incorrect. It completely ruined our dining experience.</p>
                            </div>
    
                            <div className="mt-4">
                                <h4 className="font-semibold">Hawker Rating</h4>
                                <p className="text-[#333] text-[14px]">2.3</p>
                            </div>
    
                            <div className="mt-4">
                                <h4 className="font-semibold">Image For Supporting Evidence </h4>
                                <p className="text-[14px] font-semibold text-blue-600 underline">photo_of_restaurant.jpg</p>
                            </div>
    
                            <div className="mt-4">
                                <h4 className="font-semibold">Created At</h4>
                                <p className="text-[#333] text-[14px]">23rd August 2024, 7:00 PM</p>
                            </div>
                        </div>
                    </section>
        </>
      )

}