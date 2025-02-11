import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import AdminNavigationBar from "../../components/Admin/AdminNavigationBar";
import useAuthStore from "../../store/useAuthStore";

export default function EditUserDetailsPage() {
    const { hawkerID } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});
    const { id, userType } = useAuthStore();

    useEffect(() => {
        if (id && id !== "0" && userType === 'admin') {
            // User is authorized; no action needed
            return;
        } else {
            // User is not authorized; show alert and redirect
            alert("You are not authorized to view this page! Only hawkers are allowed to view this page.");
            navigate('/');
        }
    }, [id, userType]); 

    // Initial form state
    const [formData, setFormData] = useState({
        contactAddress: "",
        mobilePhoneNumber: "",
        gender: "",
        race: "",
        citizenship: "",
        employmentStatus: "",
        businessName: "",
        businessType: "",
        businessStartTime: "",
        businessEndTime: "",
        businessExperience: "",
        foodType: "",
        birthDate: "",
        bankAccountNumber: "",
        bankHolderName: "",
        bankName: "",
        householdIncome: ""
    });

    // Validation rules
    const validationRules = {
        mobilePhoneNumber: {
            pattern: /^\+?[1-9]\d{7,14}$/,
            message: "Please enter a valid phone number"
        },
        bankAccountNumber: {
            pattern: /^\d{6,17}$/,
            message: "Bank account number must be 6-17 digits"
        },
        householdIncome: {
            pattern: /^\d+(\.\d{1,2})?$/,
            message: "Please enter a valid income amount"
        }
    };

    // Validate a single field
    const validateField = (name, value) => {
        if (validationRules[name]) {
            const { pattern, message } = validationRules[name];
            if (value && !pattern.test(value)) {
                return message;
            }
        }
        return null;
    };

    // Validate all fields
    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        Object.keys(formData).forEach(field => {
            const error = validateField(field, formData[field]);
            if (error) {
                newErrors[field] = error;
                isValid = false;
            }
        });

        // Business hours validation
        if (formData.businessStartTime && formData.businessEndTime) {
            if (formData.businessStartTime >= formData.businessEndTime) {
                newErrors.businessEndTime = "End time must be after start time";
                isValid = false;
            }
        }

        setFieldErrors(newErrors);

        if (!isValid) {
            const errorMessages = Object.values(newErrors).join('\n');
            alert('Please correct the following errors:\n\n' + errorMessages);
        }

        return isValid;
    };

    useEffect(() => {
        async function getData() {
            try {
                const { data, error } = await supabase
                    .from("Hawker")
                    .select(`
                        *,
                        HawkerFinanceDetails (*),
                        BusinessInfo (*)
                    `)
                    .eq("hawkerID", hawkerID)
                    .single();

                if (error) throw error;

                if (data) {
                    setFormData({
                        contactAddress: data.contactAddress || "",
                        mobilePhoneNumber: data.mobilePhoneNumber || "",
                        gender: data.gender || "",
                        race: data.race || "",
                        citizenship: data.citizenship || "",
                        birthDate: data.birthDate || "",
                        businessName: data.BusinessInfo[0]?.businessName || "",
                        businessType: data.BusinessInfo[0]?.businessType || "",
                        businessStartTime: data.BusinessInfo[0]?.businessStartTime || "",
                        businessEndTime: data.BusinessInfo[0]?.businessEndTime || "",
                        businessExperience: data.BusinessInfo[0]?.businessExperience || "",
                        foodType: data.BusinessInfo[0]?.foodType || "",
                        bankAccountNumber: data.HawkerFinanceDetails[0]?.bankAccountNumber || "",
                        bankHolderName: data.HawkerFinanceDetails[0]?.bankHolderName || "",
                        bankName: data.HawkerFinanceDetails[0]?.bankName || "",
                        householdIncome: data.HawkerFinanceDetails[0]?.householdIncome || "",
                        employmentStatus: data.HawkerFinanceDetails[0]?.employmentStatus || ""
                    });
                }
            } catch (error) {
                alert("Failed to load hawker details: " + error.message);
            } finally {
                setIsLoading(false);
            }
        }

        getData();
    }, [hawkerID]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // Clear field-specific error when user starts typing
        setFieldErrors(prev => ({
            ...prev,
            [name]: null
        }));

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    async function handleSubmit(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const updates = await Promise.all([
                supabase
                    .from("Hawker")
                    .update({
                        contactAddress: formData.contactAddress,
                        mobilePhoneNumber: formData.mobilePhoneNumber,
                        gender: formData.gender,
                        race: formData.race,
                        citizenship: formData.citizenship,
                        birthDate: formData.birthDate
                    })
                    .eq("hawkerID", hawkerID),

                supabase
                    .from("BusinessInfo")
                    .update({
                        businessName: formData.businessName,
                        businessType: formData.businessType,
                        businessStartTime: formData.businessStartTime,
                        businessEndTime: formData.businessEndTime,
                        businessExperience: formData.businessExperience,
                        foodType: formData.foodType
                    })
                    .eq("hawkerID", hawkerID),

                supabase
                    .from("HawkerFinanceDetails")
                    .update({
                        bankAccountNumber: formData.bankAccountNumber,
                        bankHolderName: formData.bankHolderName,
                        bankName: formData.bankName,
                        householdIncome: formData.householdIncome,
                        employmentStatus: formData.employmentStatus
                    })
                    .eq("hawkerID", hawkerID)
            ]);

            const errors = updates.filter(update => update.error);
            
            if (errors.length > 0) {
                throw new Error(errors.map(update => update.error.message).join("\n"));
            }

            alert("Successfully updated details of hawker");
            navigate("/admin/manage-user-accounts");
        } catch (error) {
            alert("Error updating hawker details:\n\n" + error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    if (isLoading) {
        return (
            <>
                <AdminNavigationBar />
                <div className="p-10">Loading hawker details...</div>
            </>
        );
    }

    return (
        <>
            <AdminNavigationBar />
            <section className="p-10">
                <div className="mb-5 text-[12px]">
                    <a href="" className="text-blue-600 hover:underline">Manage Accounts</a>
                    <span className="text-blue-600"> {">"} </span>
                    <a href="" className="text-blue-600 hover:underline">Edit Details</a>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between max-w-[1400px]">
                        <h1 className="text-[32px] font-bold">Edit User Details</h1>
                        <button 
                            type="submit" 
                            className={`rounded-md py-3 px-16 text-white ${
                                isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>

                    <main className="grid grid-cols-2 gap-x-64 max-w-[1400px]">
                        <div>
                            {/* First Column */}
                            {[
                                ['contactAddress', 'Contact Address', 'text'],
                                ['mobilePhoneNumber', 'Mobile Phone Number', 'text'],
                                ['gender', 'Gender', 'text'],
                                ['race', 'Race', 'text'],
                                ['citizenship', 'Citizenship', 'text'],
                                ['employmentStatus', 'Employment Status', 'text'],
                                ['businessName', 'Business Name', 'text'],
                                ['businessType', 'Business Type', 'text'],
                                ['businessStartTime', 'Business Start Time', 'time'],
                                ['businessEndTime', 'Business End Time', 'time'],
                                ['businessExperience', 'Business Experience', 'text'],
                                ['foodType', 'Food Type', 'text']
                            ].map(([name, label, type]) => (
                                <div key={name} className="flex flex-col mt-5">
                                    <label className="font-semibold">{label}:</label>
                                    <input
                                        type={type}
                                        name={name}
                                        value={formData[name]}
                                        onChange={handleInputChange}
                                        className={`border rounded-md py-2 px-4 mt-1 ${
                                            fieldErrors[name] 
                                                ? 'border-red-500' 
                                                : 'border-[#e0e0e0]'
                                        }`}
                                    />
                                </div>
                            ))}
                        </div>

                        <div>
                            {/* Second Column */}
                            {[
                                ['birthDate', 'Birth Date', 'date'],
                                ['bankAccountNumber', 'Bank Account Number', 'text'],
                                ['bankHolderName', 'Bank Holder Name', 'text'],
                                ['bankName', 'Bank Name', 'text'],
                                ['householdIncome', 'Household Income', 'text']
                            ].map(([name, label, type]) => (
                                <div key={name} className="flex flex-col mt-5">
                                    <label className="font-semibold">{label}:</label>
                                    <input
                                        type={type}
                                        name={name}
                                        value={formData[name]}
                                        onChange={handleInputChange}
                                        className={`border rounded-md py-2 px-4 mt-1 ${
                                            fieldErrors[name] 
                                                ? 'border-red-500' 
                                                : 'border-[#e0e0e0]'
                                        }`}
                                    />
                                </div>
                            ))}
                        </div>
                    </main>
                </form>
            </section>
        </>
    );
}