import AdminNavigationBar from "../../components/Admin/AdminNavigationBar";
import Feedback from "../../assets/Feedback.svg"
import License from "../../assets/License.svg"
import Penalties from "../../assets/Penalties.svg"
import Profile from "../../assets/profile.svg"
import appSubStatus from "../../assets/appSubStatus.svg"

export default function HawkerDashboardPage() {
  return (
    <>
        <AdminNavigationBar />
        <section className="p-10">
            <h1 className="text-[24px] font-bold text-center">Dashboard</h1>
            <div className="flex flex-wrap justify-center gap-4 mt-10 max-w-[1200px] mx-auto">
                <div className="w-[340px] border border-blue-200 px-16 py-[50px] rounded-lg hover:border-blue-600 hover:outline hover:outline-blue-600 transition">
                    <img src={Profile} alt="" className="mx-auto"/>
                    <h2 className="text-blue-600 font-semibold text-lg text-center mt-10">Profile</h2>
                </div>
                <div className="w-[340px] border border-blue-200 px-16 py-[50px] rounded-lg hover:border-blue-600 hover:outline hover:outline-blue-600 transition">
                    <img src={Feedback} alt="" className="mx-auto"/>
                    <h2 className="text-blue-600 font-semibold text-lg text-center mt-10">Feedback</h2>
                </div>
                <div className="w-[340px] border border-blue-200 px-16 py-[50px] rounded-lg hover:border-blue-600 hover:outline hover:outline-blue-600 transition">
                    <img src={License} alt="" className="mx-auto"/>
                    <h2 className="text-blue-600 font-semibold text-lg text-center mt-10">Apply License</h2>
                </div>
                <div className="w-[340px] border border-blue-200 px-6 py-[50px] rounded-lg hover:border-blue-600 hover:outline hover:outline-blue-600 transition">
                    <img src={Penalties} alt="" className="mx-auto w-64"/>
                    <h2 className="text-blue-600 font-semibold text-lg text-center mt-10">Penalties</h2>
                </div>
                <div className="w-[340px] border border-blue-200 px-16 py-[50px] rounded-lg hover:border-blue-600 hover:outline hover:outline-blue-600 transition">
                    <img src={License} alt="" className="mx-auto"/>
                    <h2 className="text-blue-600 font-semibold text-lg text-center mt-10">Renew License</h2>
                </div>
                <div className="w-[340px] border border-blue-200 px-16 py-[50px] rounded-lg hover:border-blue-600 hover:outline hover:outline-blue-600 transition">
                    <img src={appSubStatus} alt="" className="mx-auto w-64"/>
                    <h2 className="text-blue-600 font-semibold text-md text-center mt-10">Application Submission Status</h2>
                </div>
            </div>
        </section>
    </>
  )
}
