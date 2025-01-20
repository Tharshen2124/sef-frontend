import { BlueFileInput } from "../../components/General/BlueFileInput";
import NavigationBar from "../../components/PublicUsers/NavigationBar";

export default function SubmitFeedbackFormPage() {
  return (
    <>
        <NavigationBar />
        <section className="p-10">
            <div className="mb-5 text-[12px]">
                <a href="" className="text-blue-600 hover:underline">Feedback</a>
                <span> {">"} </span>
                <a href="" className="text-blue-600 hover:underline">Submit Feedback</a>
            </div>

            <div className="border border-[#e0e0e0]  flex flex-col mx-auto w-[530px] p-16 rounded-lg">
                <h1 className="text-2xl font-bold text-left">Submit Feedback</h1>
                
                <div className="flex flex-col mt-8">
                    <label htmlFor="" className="font-semibold">Feedback Title:</label>
                    <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                </div>

                <div className="flex flex-col mt-4">
                    <label htmlFor="" className="font-semibold">Feedback Description:</label>
                    <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                </div>

                <div className="flex flex-col mt-4">
                    <label htmlFor="" className="font-semibold">Hawker Name:</label>
                    <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                </div>

                <div className="flex flex-col mt-4">
                    <label htmlFor="" className="font-semibold">Hawker Rating:</label>
                    <input type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                </div>
                <div className="flex flex-col mt-4">
                    <label htmlFor="" className="font-semibold">Image for Evidence <i className="font-normal">{"(Optional)"}</i>:</label>
                    <BlueFileInput type="text" className="border border-[#e0e0e0] rounded-md py-2 px-4 mt-1" />
                </div>
                <button className="bg-blue-600 py-3 text-white mt-8 rounded-md">Submit</button>

            </div>
        </section>
    </>
  )
}
