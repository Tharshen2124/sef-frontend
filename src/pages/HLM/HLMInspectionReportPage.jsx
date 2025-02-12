import { CirclePlus } from "lucide-react";
import HLMNavigationBar from "../../components/HLM/NavigationBarHLM";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import { formatTime } from "../../utils/time";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

export default function HLMInspectionReportPage() {
  const [inspectionReports, setInspectionReports] = useState()
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
      setInspectionReports(data)
      console.log(data)
    }
    getData()
  }, [])

  return (
    <>
    <HLMNavigationBar />
            <section className="p-10">
            <div className="mb-5 text-[12px]">
                    <a href="" className="text-blue-600 hover:underline">Dashboard</a>
                    <span> {">"} </span>
                    <a href="" className="text-blue-600 hover:underline">Renew License</a>
                </div>
            <div className="flex justify-between mb-5 items-center">
            <h1 className="text-2xl font-bold">Inspection Reports</h1>
                <a href="/hlm/inspection-reports/add" className="hover:no-underline hover:bg-blue-700 flex items-center py-3 px-5 bg-blue-600 rounded-lg text-white gap-x-[6px]">
                    <CirclePlus />
                    New Inspection
                </a>
            </div>
            <div className="w-full mx-auto border rounded-lg border-[#e0e0e0] py-16 px-24">
            <table className="w-full">
                <thead>
                <tr className="text-left border-b border-[#999]">
                    <th className="py-2">Hawker Name</th>
                    <th className="py-2 lg:pl-16">Inspection Date</th>
                    <th className="py-2">Inspection Time</th>
                    <th className="py-2 w-[150px]"></th>
                </tr>
                </thead>
                <tbody>

                {inspectionReports && inspectionReports.map((item, index) => (
                    <tr key={index} className="border-b border-[#e0e0e0]">
                    <td className="py-4">{item.Hawker.BusinessInfo[0].businessName}</td>
                    <td className="py-6 lg:pl-16">{item.inspectionDate}</td>
                    <td className="py-4 ">{formatTime(item.inspectionTime)}</td>
                    <td className="py-4 gap-x-4">
                        <a 
                        href={`/hlm/inspection-reports/${item.siteInspectionID}`}
                        className="text-blue-600 hover:text-blue-800 underline w-[91px] mr-8"
                        >
                        More Details
                        </a>
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
