import NavigationBar from "../../components/Hawkers/HawkerNavigationBar";

export default function HawkerViewPenaltyPage() {
  return (
    <>
    <NavigationBar />
    <section className="p-10">
            <h1 className="text-[32px] font-bold">Penalties</h1>
            <div className="mt-6 border border-[#e0e0e0] rounded-lg grid grid-cols-2 py-8 px-16">
                <div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Penalty Amount:</label>
                        <p className="text-[#555]">RM100.00</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Violation Type:</label>
                        <p className="text-[#555]">No business conducted for 30 days</p>
                    </div>
                </div>
                <div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Created at:</label>
                        <p className="text-[#555]">16th September 2024, 7:00 PM </p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Penalty Document:</label>
                        <p><a href="#" className="text-blue-600 underline font-semibold">Document Link</a></p>
                    </div>
                </div>
            </div>

            <div className="mt-6 border border-[#e0e0e0] rounded-lg grid grid-cols-2 py-8 px-16">
                <div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Penalty Amount:</label>
                        <p className="text-[#555]">RM100.00</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Violation Type:</label>
                        <p className="text-[#555]">Not displaying license prominently</p>
                    </div>
                </div>
                <div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Created at:</label>
                        <p className="text-[#555]">24th August 2024, 8:00 PM </p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Penalty Document:</label>
                        <p><a href="#" className="text-blue-600 underline font-semibold">Document Link</a></p>
                    </div>
                </div>
            </div>
    </section>
    </>
  )
}
