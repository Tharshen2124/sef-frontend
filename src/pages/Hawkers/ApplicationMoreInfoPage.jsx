

import { useEffect, useState } from "react";
import NavigationBar from "../../components/Hawkers/HawkerNavigationBar";
import { supabase } from "../../utils/supabaseClient";
import { useNavigate, useParams } from "react-router-dom";
import { formatTime } from "../../utils/time";
import useAuthStore from "../../store/useAuthStore";

export default function ApplicationMoreInfoPage() {
    const { licenseApplicationID } = useParams();
    const [application, setApplication] = useState(null);
    const { id, userType } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (id && id !== "0" && userType === 'hawker') {
            // User is authorized; no action needed
            return;
        } else {
            // User is not authorized; show alert and redirect
            alert("You are not authorized to view this page! Only hawkers are allowed to view this page.");
            navigate('/');
        }
    }, [id, userType]);

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
                .single();

            console.log(data)

            setApplication(data);
        }
        getData();
    }, []);

    return (
        <>
            <NavigationBar />
            <section className="p-10">
                <div className="mb-5 text-[12px]">
                    <a href={`/hawker/application-submissions-status`} className="text-blue-600 hover:underline">Application Submission Status</a>
                    <span className="text-blue-600"> {">"} </span>
                    <a href={`/hawker/application-submissions-status/${licenseApplicationID}`} className="text-blue-600 hover:underline">More Info</a>
                </div>

                {application && application?.isRenew && (
                    <div>
                        <div>
                            <h2 className="text-xl font-bold mt-6">License Renewal Details</h2>
                            <div className="mt-2 border border-[#e0e0e0] rounded-lg grid grid-cols-2 py-8 px-16">
                                <div>
                                    <div >
                                        <label className="font-semibold">Location Plan:</label>
                                        <p className="text-[#555]">{ application.locationPlan || "N/A"}</p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="font-semibold">Typhoid Injection Card:</label>
                                        <p><a target="_blank" href={application.typhoidInjectionCard} className="text-blue-600 underline font-bold hover:text-blue-700 active:text-blue-800">Card Link</a></p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="font-semibold">Passport Photo:</label>
                                        <p><a target="_blank" href={application.passportPhoto} className="text-blue-600 underline font-bold hover:text-blue-700 active:text-blue-800">Photo Link</a></p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label className="font-semibold">Payment Proof:</label>
                                        <p>
                                            <a target="_blank" href={application.passportPhoto} className="text-blue-600 font-bold underline hover:text-blue-700 active:text-blue-800">Proof Link</a>
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="font-semibold">Food Handling Certificate:</label>
                                        <p><a target="_blank" href={application.passportPhoto} className="text-blue-600 underline font-bold hover:text-blue-700 active:text-blue-800">Certificate Link</a></p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="font-semibold">Admin Approval:</label>
                                        <p className="text-[#555]">{ application.isAdminApproved || "N/A" }</p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="font-semibold">Status:</label>
                                        <p  className="text-[#555]">{ application.status }</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                    </div>
                )}

                {application && !application?.isRenew && (
                <>
                    <h2 className="text-xl font-bold mt-6">License Application Details</h2>
                    <div className="mt-2 border border-[#e0e0e0] rounded-lg grid grid-cols-2 py-8 px-16">
                    <div>
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
                            <p className="text-[#555]">{ application?.Hawker?.BusinessInfo?.[0]?.businessType || "N/A" }</p>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="" className="font-semibold">Business Start Time:</label>
                            <p className="text-[#555]">{ formatTime(application?.Hawker?.BusinessInfo?.[0]?.businessStartTime) || "N/A" }</p>
                        </div>
                    </div>
                    <div>
                        <div className="mt-4">
                            <label className="font-semibold">Location Plan:</label>
                            <p className="text-[#555]">
                                <a href={application?.locationPlan} className="text-blue-600 underline font-semibold">
                                    View Plan
                                </a>
                            </p>
                        </div>
                        <div className="mt-4">
                            <label className="font-semibold">Passport Photo:</label>
                            <p>
                                <a href={application?.passportPhoto} className="text-blue-600 underline font-semibold">
                                    Photo Link
                                </a>
                            </p>
                        </div>
                        <div className="mt-4">
                            <label className="font-semibold">Payment Proof:</label>
                            <p>
                                <a href={application?.paymentProof} className="text-blue-600 underline font-semibold">
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
                                <a href={application?.typhoidInjectionCard} target="_blank" className="text-blue-600 underline font-semibold">Card Link</a>
                            </p>       
                        </div>
                        <div className="mt-4">
                            <label htmlFor="" className="font-semibold">Business Experience:</label>
                            <p className="text-[#555]">{application?.Hawker?.BusinessInfo?.[0]?.businessExperience || "N/A" }</p>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="" className="font-semibold">Food Type:</label>
                            <p className="text-[#555]">{ application?.Hawker?.BusinessInfo?.[0]?.foodType || "N/A" }</p>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="" className="font-semibold">Business End Time:</label>
                            <p className="text-[#555]">{formatTime(application?.Hawker?.BusinessInfo?.[0]?.businessEndTime) || "N/A" }</p>
                        </div>
                        <div className="mt-4">
                            <label className="font-semibold">Admin Approval:</label>
                            <p className="text-[#555]">{ application.isAdminApproved || "N/A" }</p>
                        </div>

                        <div className="mt-4">
                            <label className="font-semibold">Status:</label>
                            <p  className="text-[#555]">{ application.status || "N/A" }</p>
                        </div>
                    </div>
                    </div>
                    </>
                )}

                
            </section>
        </>
    );
}