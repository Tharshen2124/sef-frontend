import { useEffect, useState } from "react";
import { BlueFileInput } from "../../components/General/BlueFileInput";
import { supabase } from "../../utils/supabaseClient";
import { Navigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import HawkerNavigationBar from "../../components/Hawkers/HawkerNavigationBar";

export default function ApplyForLicensePage() {
    const { id: hawkerId, userType } = useAuthStore();
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [redirectIfSuccess, setRedirectIfSuccess] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        bankAccountNumber: "",
        bankName: "",
        bankHolderName: "",
        employmentStatus: "",
        householdIncome: "",
        businessName: "",
        businessType: "",
        businessStartTime: "",
        businessEndTime: "",
        locationPlan: "",
        businessExperience: "",
        foodType: "",
    });

    // File state
    const [files, setFiles] = useState({
        passportPhoto: null,
        paymentProof: null,
        foodHandlingCertificate: null,
        typhoidInjectionCard: null,
    });

    useEffect(() => {
        if (userType !== 'hawker') {
            setShouldRedirect(true);
        }
    }, [userType]);

    const validateForm = () => {
        const errors = {};
        
        // Validate required fields
        Object.entries(formData).forEach(([key, value]) => {
            if (!value || value.trim() === '') {
                errors[key] = `${key.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`;
            }
        });

        // Validate files
        Object.entries(files).forEach(([key, file]) => {
            if (!file) {
                errors[key] = `${key.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`;
            }
        });

        // Validate time range
        if (formData.businessStartTime && formData.businessEndTime) {
            if (formData.businessStartTime >= formData.businessEndTime) {
                errors.businessTime = "Business end time must be after start time";
            }
        }

        // Validate file types and sizes
        Object.entries(files).forEach(([key, file]) => {
            if (file) {
                if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
                    errors[`${key}Type`] = 'File must be JPEG, PNG, or PDF';
                }
                if (file.size > 5 * 1024 * 1024) { // 5MB limit
                    errors[`${key}Size`] = 'File size must be less than 5MB';
                }
            }
        });

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (file, type) => {
        setFiles(prev => ({
            ...prev,
            [type]: file
        }));
    };

    async function uploadFile(file, bucket) {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${hawkerId}-${Date.now()}.${fileExt}`;

            const { data: uploadData, error: uploadError } = await supabase
                .storage
                .from(bucket)
                .upload(fileName, file, {
                    cacheControl: '3600',
                    upsert: false,
                });

            if (uploadError) throw uploadError;

            const { data: getData, error: urlError } = await supabase
                .storage
                .from(bucket)
                .getPublicUrl(uploadData.path);

            if (urlError) throw urlError
            if (!getData) throw new Error('No URL retrieved');

            return getData.publicUrl;
        } catch (error) {
            console.error(`Error uploading to ${bucket}:`, error);
            throw new Error(`Failed to upload ${bucket}: ${error.message}`);
        }
    }

    async function insertData(table, data) {
        try {
            const { error } = await supabase.from(table).insert(data);
            if (error) throw error;
        } catch (error) {
            console.error(`Error inserting into ${table}:`, error);
            throw new Error(`Failed to save ${table} information: ${error.message}`);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            window.scrollTo(0, 0);
            return;
        }

        setIsSubmitting(true);

        try {
            // Upload all files in parallel
            const [passportPhotoUrl, paymentProofUrl, foodHandlingCertificateUrl, typhoidInjectionCardUrl] = 
                await Promise.all([
                    uploadFile(files.passportPhoto, 'passportPhoto'),
                    uploadFile(files.paymentProof, 'paymentProof'),
                    uploadFile(files.foodHandlingCertificate, 'foodHandlingCertificate'),
                    uploadFile(files.typhoidInjectionCard, 'typhoidInjectionCard')
                ]);

            // Insert all data in parallel
            await Promise.all([
                insertData('BusinessInfo', {
                    businessName: formData.businessName,
                    businessExperience: formData.businessExperience,
                    businessStartTime: formData.businessStartTime,
                    businessEndTime: formData.businessEndTime,
                    businessType: formData.businessExperience,
                    foodType: formData.foodType,
                    hawkerID: hawkerId
                }),
                insertData('HawkerFinanceDetails', {
                    bankAccountNumber: formData.bankAccountNumber,
                    bankHolderName: formData.bankHolderName,
                    bankName: formData.bankName,
                    employmentStatus: formData.employmentStatus,
                    householdIncome: formData.householdIncome,
                    hawkerID: hawkerId
                }),
                insertData('LicenseApplication', {
                    locationPlan: formData.locationPlan,
                    passportPhoto: passportPhotoUrl,
                    paymentProof: paymentProofUrl,
                    foodHandlingCertificate: foodHandlingCertificateUrl,
                    typhoidInjectionCard: typhoidInjectionCardUrl,
                    hawkerID: hawkerId
                })
            ]);

            setRedirectIfSuccess(true);
            alert("Successfully applied for license!");
        } catch (error) {
            console.error('Application submission failed:', error);
            alert(`Failed to submit application: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (shouldRedirect) {
        return <Navigate to="/" replace />;
    }

    if (redirectIfSuccess) {
        return <Navigate to="/hawker/dashboard" replace />;
    }

    return (
        <>
            <HawkerNavigationBar />
            <section className="p-10">
                <div className="mb-5 text-[12px]">
                    <a href="" className="text-blue-600 hover:underline">Dashboard</a>
                    <span> {">"} </span>
                    <a href="" className="text-blue-600 hover:underline">Apply License</a>
                </div>
                
                {Object.keys(formErrors).length > 0 && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        <ul className="list-disc pl-4">
                            {Object.values(formErrors).map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between max-w-[1200px]">
                        <h1 className="text-[32px] font-bold">Apply For License</h1>
                        <button 
                            className={`rounded-md py-3 px-16 text-white ${
                                isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600'
                            }`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>

                    <main className="grid grid-cols-2 gap-x-64 max-w-[1200px]">
                        <div>
                            {/* First column form fields */}
                            {Object.entries({
                                bankAccountNumber: "Bank Account Number",
                                bankName: "Bank Name",
                                bankHolderName: "Bank Holder Name",
                                employmentStatus: "Employment Status",
                                householdIncome: "Household Income",
                                businessName: "Business Name",
                                businessType: "Business Type",
                                businessStartTime: "Business Start Time",
                                businessEndTime: "Business End Time"
                            }).map(([key, label]) => (
                                <div key={key} className="flex flex-col mt-5">
                                    <label className="font-semibold">{label}:</label>
                                    <input
                                        type={key.includes('Time') ? 'time' : 'text'}
                                        name={key}
                                        value={formData[key]}
                                        onChange={handleInputChange}
                                        className={`border rounded-md py-2 px-4 mt-1 ${
                                            formErrors[key] ? 'border-red-500' : 'border-[#e0e0e0]'
                                        }`}
                                    />
                                    {formErrors[key] && (
                                        <span className="text-red-500 text-sm mt-1">{formErrors[key]}</span>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div>
                            {/* Second column form fields */}
                            <div className="flex flex-col mt-5">
                                <label className="font-semibold">Location Plan:</label>
                                <input
                                    type="text"
                                    name="locationPlan"
                                    value={formData.locationPlan}
                                    onChange={handleInputChange}
                                    className={`border rounded-md py-2 px-4 mt-1 ${
                                        formErrors.locationPlan ? 'border-red-500' : 'border-[#e0e0e0]'
                                    }`}
                                />
                                {formErrors.locationPlan && (
                                    <span className="text-red-500 text-sm mt-1">{formErrors.locationPlan}</span>
                                )}
                            </div>

                            {/* File inputs */}
                            {[
                                ['passportPhoto', 'Passport Photo'],
                                ['paymentProof', 'Payment Proof (RM 1000)'],
                                ['foodHandlingCertificate', 'Food Handling Certificate'],
                                ['typhoidInjectionCard', 'Typhoid Injection Card']
                            ].map(([key, label]) => (
                                <div key={key} className="flex flex-col mt-5">
                                    <label className="font-semibold">{label}:</label>
                                    <BlueFileInput
                                        onChange={(file) => handleFileChange(file, key)}
                                        className={`border rounded-md py-2 px-4 ${
                                            formErrors[key] ? 'border-red-500' : 'border-[#e0e0e0]'
                                        }`}
                                    />
                                    {(formErrors[key] || formErrors[`${key}Type`] || formErrors[`${key}Size`]) && (
                                        <span className="text-red-500 text-sm mt-1">
                                            {formErrors[key] || formErrors[`${key}Type`] || formErrors[`${key}Size`]}
                                        </span>
                                    )}
                                </div>
                            ))}

                            {/* Additional text inputs */}
                            {[
                                ['businessExperience', 'Business Experience'],
                                ['foodType', 'Food Type']
                            ].map(([key, label]) => (
                                <div key={key} className="flex flex-col mt-5">
                                    <label className="font-semibold">{label}:</label>
                                    <input
                                        type="text"
                                        name={key}
                                        value={formData[key]}
                                        onChange={handleInputChange}
                                        className={`border rounded-md py-2 px-4 mt-1 ${
                                            formErrors[key] ? 'border-red-500' : 'border-[#e0e0e0]'
                                        }`}
                                    />
                                    {formErrors[key] && (
                                        <span className="text-red-500 text-sm mt-1">{formErrors[key]}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </main>
                </form>
            </section>
        </>
    );
}