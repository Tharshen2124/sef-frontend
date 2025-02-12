import { useEffect, useState } from "react";
import HLMNavigationBar from "../../components/HLM/NavigationBarHLM";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../utils/supabaseClient";
import { formatTime } from "../../utils/time";
import useAuthStore from "../../store/useAuthStore";

export default function HLMInspectionReportMoreDetailsPage() {
    const { inspectionID } = useParams()
    const [inspectionReport, setInspectionReport] = useState()
    const { id, userType } = useAuthStore();
    const navigate = useNavigate()

    useEffect(() => {
        if (id && id !== "0" && userType === 'hlm') {
            // User is authorized; no action needed
            return;
        } else {
            // User is not authorized; show alert and redirect
            alert("You are not authorized to view this page! Only Hawker license manager are allowed to view this page.");
            navigate('/');
        }
    }, [id, userType]);

    useEffect(() => {
        async function getData() {
            const { data, error } = await supabase
                .from("SiteInspection")
                .select(`
                    *,
                    Hawker:hawkerID (
                        *,
                        BusinessInfo (*)
                    )
                `)
                .eq("siteInspectionID", inspectionID) 
                .single(); 

            setInspectionReport(data)
        }
        getData()
    }, [])


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
                    <span className="font-bold">Hawker Business Name: </span> 
                    {inspectionReport && inspectionReport.Hawker.BusinessInfo[0].businessName}
                </h1>
            </div>  
            <div className="mt-4 border border-[#e0e0e0] rounded-lg grid grid-cols-2 py-8 px-16">
                <div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Inspection Date:</label>
                        <p className="text-[#555]">{inspectionReport && inspectionReport.inspectionDate}</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Inspection Time:</label>
                        <p className="text-[#555]">{inspectionReport && formatTime(inspectionReport.inspectionTime)}</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Outcome:</label>
                        <p className="text-[#555]">{inspectionReport && inspectionReport.inspectionOutcome}</p>
                    </div>
                    
                </div>
                <div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Inspection Photos:</label>
                        <p>
                            <a href={inspectionReport && inspectionReport.inspectionPhoto} target="_blank" className="text-blue-600 underline font-semibold">Photo Link</a>
                        </p>                    
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Rating:</label>
                        <p className="text-[#555]">{inspectionReport && inspectionReport.inspectionRating}</p>
                    </div>
                </div>
            </div>
    </section>
    </>
  )
}
