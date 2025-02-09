

import { useEffect, useState } from "react";
import NavigationBar from "../../components/Hawkers/HawkerNavigationBar";
import { supabase } from "../../utils/supabaseClient";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { formatTime } from "../../utils/time";

export default function ApplicationMoreInfoPage() {
    const { hawkerID, licenseApplicationID } = useParams();
    const [application, setApplication] = useState(null);
    
    const [applicationType, setApplicationType] = useState()

    useEffect(() => {
        async function getData() {

                const { data, error } = await supabase
                    .from("LicenseApplication")
                    .select(`
                        *,
                        Hawker:hawkerID(
                            *,
                            User:userID (*),
                            BusinessInfo (*),
                            HawkerFinanceDetails (*)
                        )
                    `)
                    .eq("licenseApplicationID", licenseApplicationID)
                    .eq("hawkerID", hawkerID)
                    .single();

                setApplication(data);
                console.log("Fetched data:", JSON.stringify(data, null, 2));
        }
        getData();
    }, [licenseApplicationID, hawkerID]);

    useEffect(() => {
        if (application) {
            setApplicationType(application.isRenew ? "Renewal" : "Initial Application");
        }
    }, [application]);

    return (
        <>
            <NavigationBar />
            <section className="p-10">
                <div className="mb-5 text-[12px]">
                    <Link to={`/hawker/application-submissions-status/${hawkerID}`} className="text-blue-600 hover:underline">Application Submission Status</Link>
                    <span className="text-blue-600"> {">"} </span>
                    <a href="" className="text-blue-600 hover:underline">More Info</a>
                </div>

                <div className="flex justify-between items-center">
                    <h1 className="py-2 px-4 bg-[#DEE9FC] rounded-lg">
                        <span className="font-bold">Hawker Business Name: </span>
                        {application?.Hawker?.BusinessInfo?.[0]?.businessName || "N/A"}
                    </h1>
                </div>

                <h2 className="text-xl font-bold mt-6">Hawker Details</h2>
                <div className="mt-2 border border-[#e0e0e0] rounded-lg grid grid-cols-2 py-8 px-16">
                    <div>
                        <div className="mt-4">
                            <label className="font-semibold">Phone Number:</label>
                            <p className="text-[#555]">{application?.Hawker?.mobilePhoneNumber || "N/A"}</p>
                        </div>
                        <div className="mt-4">
                            <label className="font-semibold">Operation Hours:</label>
                            <p className="text-[#555]">
                                {formatTime(application?.Hawker?.BusinessInfo?.[0]?.businessStartTime) || "N/A"} - 
                                {formatTime(application?.Hawker?.BusinessInfo?.[0]?.businessEndTime) || "N/A"}
                            </p>
                        </div>
                        <div className="mt-4">
                            <label className="font-semibold">Full Name:</label>
                            <p className="text-[#555]">{application?.Hawker?.User?.fullName || "N/A"}</p>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="" className="font-semibold">IC Number:</label>
                            <p className="text-[#555]">{application?.Hawker?.User?.icNumber|| "N/A"}</p>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="" className="font-semibold">Email:</label>
                            <p className="text-[#555]">{application?.Hawker?.User?.email|| "N/A"}</p>
                        </div>
                    </div>
                    <div>
                        <div className="mt-4">
                            <label className="font-semibold">Birth Date:</label>
                            <p className="text-[#555]">{application?.Hawker?.birthDate || "N/A"}</p>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="" className="font-semibold">Gender:</label>
                            <p className="text-[#555]">{application?.Hawker?.gender|| "N/A"}</p>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="" className="font-semibold">Race:</label>
                            <p className="text-[#555]">{application?.Hawker?.race|| "N/A"}</p>
                        </div>
                        <div className="mt-4">
                            <label className="font-semibold">Hawker Photo:</label>
                            <p>
                                <a href={application?.Hawker?.hawkerImage || "#"} className="text-blue-600 underline font-semibold">
                                    Photo Link
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

                <h2 className="text-xl font-bold mt-6">License Application Details</h2>
                <div className="mt-2 border border-[#e0e0e0] rounded-lg grid grid-cols-2 py-8 px-16">
                    <div>
                        <div className="mt-4">
                            <label className="font-semibold">Type of Application:</label>
                            <p className="text-[#555]">{applicationType || "N/A"}</p>
                        </div>
                        <div className="mt-4">
                            <label className="font-semibold">Bank Name:</label>
                            <p className="text-[#555]">{application?.Hawker?.HawkerFinanceDetails?.[0]?.bankName || "N/A"}</p>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="" className="font-semibold">Bank Account Number:</label>
                            <p className="text-[#555]">{ application?.Hawker?.HawkerFinanceDetails?.[0]?.bankAccountNumber || "N/A"}</p>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="" className="font-semibold">Bank Name:</label>
                            <p className="text-[#555]">{ application?.Hawker?.HawkerFinanceDetails?.[0]?.bankName|| "N/A" }</p>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="" className="font-semibold">Bank Holder Name:</label>
                            <p className="text-[#555]">{ application?.Hawker?.HawkerFinanceDetails?.[0]?.bankHolderName|| "N/A" }</p>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="" className="font-semibold">Employment Status:</label>
                            <p className="text-[#555]">{ application?.Hawker?.HawkerFinanceDetails?.[0]?.employmentStatus|| "N/A" }</p>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="" className="font-semibold">Household Income:</label>
                            <p className="text-[#555]">{ application?.Hawker?.HawkerFinanceDetails?.[0]?.householdIncome|| "N/A" }</p>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="" className="font-semibold">Business Type:</label>
                            <p className="text-[#555]">{ application?.Hawker?.HawkerFinanceDetails?.[0]?.householdIncome|| "N/A" }</p>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="" className="font-semibold">Business Start Time:</label>
                            <p className="text-[#555]">{ formatTime(application?.Hawker?.BusinessInfo?.[0]?.businessStartTime)|| "N/A" }</p>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="" className="font-semibold">Contact Number:</label>
                            <p className="text-[#555]">{ application?.Hawker?.HawkerFinanceDetails[0]?.householdIncome|| "N/A" }</p>
                        </div>
                    </div>
                    <div>
                        <div className="mt-4">
                            <label className="font-semibold">Location Plan:</label>
                            <p className="text-[#555]">
                                <a href={application?.locationPlan || "#"} className="text-blue-600 underline font-semibold">
                                    View Plan
                                </a>
                            </p>
                        </div>
                        <div className="mt-4">
                            <label className="font-semibold">Passport Photo:</label>
                            <p>
                                <a href={application?.passportPhoto || "#"} className="text-blue-600 underline font-semibold">
                                    Photo Link
                                </a>
                            </p>
                        </div>
                        <div className="mt-4">
                            <label className="font-semibold">Payment Proof:</label>
                            <p>
                                <a href={application?.paymentProof|| "#"} className="text-blue-600 underline font-semibold">
                                    Photo Link
                                </a>
                            </p>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="" className="font-semibold">Food Handling Certificate:</label>
                            <p>
                                <a href={application?.foodHandlingCertificate|| "N/A"} target="_blank" className="text-blue-600 underline font-semibold">Certificate Link</a>
                            </p>       
                        </div>
                        <div className="mt-4">
                            <label htmlFor="" className="font-semibold">Typhoid Injection Card:</label>
                            <p>
                                <a href={application?.typhoidInjectionCard|| "N/A"} target="_blank" className="text-blue-600 underline font-semibold">Card Link</a>
                            </p>       
                        </div>
                        <div className="mt-4">
                            <label htmlFor="" className="font-semibold">Business Experience:</label>
                            <p className="text-[#555]">{application?.Hawker?.BusinessInfo?.[0]?.businessExperience || "N/A"}</p>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="" className="font-semibold">Food Type:</label>
                            <p className="text-[#555]">{ application?.Hawker?.BusinessInfo?.[0]?.foodType || "N/A"}</p>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="" className="font-semibold">Business End Time:</label>
                            <p className="text-[#555]">{formatTime(application?.Hawker?.BusinessInfo?.[0]?.businessEndTime)|| "N/A" }</p>
                        </div>
                        
                    </div>
                </div>
            </section>
        </>
    );
}