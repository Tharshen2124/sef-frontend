import React, { useState } from 'react';
import './PublicUserSignUpPage.css';
import HawkTuahLogo from "../../assets/hawkTuahLogo.svg";
import { supabase } from '../../utils/supabaseClient';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';
import { hashPassword } from '../../utils/hashPassword';

const PublicUserSignUpPage = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [icNumber, setIcNumber] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [errors, setErrors] = useState({
        fullName: "",
        icNumber: "",
        email: "",
        password: "",
        form: ""
    });

    const { setId, setUserType } = useAuthStore.getState();

    async function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitting(true);

        setErrors({
            fullName: "",
            icNumber: "",
            email: "",
            password: "",
            form: ""
        });

        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.values(validationErrors).some(error => error !== "")) {
            setIsSubmitting(false);
            return; // Stop submission if there are errors
        }

        try {
            const userId = await uploadUserData();
            const publicUserID = await uploadPublicUserData(userId);

            alert("Successfully signed up!");
            setId(publicUserID);
            setUserType("publicuser");
            setRedirect(true);
            setIsSubmitting(false);
        } catch (error) {
            setIsSubmitting(false);
            console.log("Unexpected error occured:", error);
            setErrors({ form: error.message });
        }
    }

    function validateForm() {
        let newErrors = { fullName: "", icNumber: "", email: "", password: "" };

        // Full Name validation
        if (!fullName) {
            newErrors.fullName = "Full name is required.";
        } else if (fullName.length < 3) {
            newErrors.fullName = "Full name must be at least 3 characters long.";
        } else if (!/^[A-Za-z\s]+$/.test(fullName)) {
            newErrors.fullName = "Full name can only contain letters and spaces.";
        }

        // IC Number validation
        if (!icNumber) {
            newErrors.icNumber = "IC number is required.";
        } else if (!/^\d{6}-\d{2}-\d{4}$/.test(icNumber)) {
            newErrors.icNumber = "IC number must follow the format XXXXXX-XX-XXXX. No special characters (besides the dash) and letters.";
        }
        

        // Email validation
        if (!email) {
            newErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Invalid email format.";
        }

        // Password validation
        if (!password) {
            newErrors.password = "Password is required.";
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,12}$/.test(password)) {
            newErrors.password = "Password must be 8-12 characters, with an uppercase letter, a lowercase letter, and a special character.";
        }

        return newErrors;
    }

    async function uploadUserData() {
        const hashedPassword = await hashPassword(password);

        const { data: publicUserData, error } = await supabase
            .from('User')
            .insert({ fullName, password: hashedPassword, icNumber, email })
            .select()
            .single();

        if (error) {
            if (error.code && error.code === "23505" && error.message.includes("icNumber")) {
                console.log('unce')
                throw new Error("IC Number already exists. Sign up with a different IC Number.");
            } else if(error.code && error.code === "23505" && error.message.includes("User_email_key")) {
                console.log('unce 2')
                throw new Error("Email already exists. Sign up with a different email.");
            } else {
                throw new Error("Error occurred! Unable to sign up.");
            }
        }

        return publicUserData.userId;
    }

    async function uploadPublicUserData(userID) {
        const { data: publicUserData, error } = await supabase
            .from('PublicUser')
            .insert({ userID })
            .select()
            .single();

            console.log(error)

        if (error) {
            throw new Error("Error occurred! Unable to sign up.");
        }

        return publicUserData.publicUserID;
    }

    if (redirect) {
        return <Navigate to="/publicuser/hawkers" replace />;
    }

    return (
        <div>
            <div className="signUpContainer">
                <div className="signUpForm">
                    <img src={HawkTuahLogo} alt="logo" />
                    <h1>Sign Up</h1>
                    {errors.form && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800 ">{errors.form}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label>Full Name: </label>
                            <input 
                                type="text" 
                                onChange={(e) => setFullName(e.target.value)} 
                                placeholder="John Doe"
                            />
                            {errors.fullName && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800 ">{errors.fullName}</p>}
                        </div>

                        <div className="input-group mt-2">
                            <label>IC Number: <span className="text-sm text-gray-800 font-normal italic" >e.g: 040221-13-1004</span></label>
                            <input 
                                type="text" 
                                placeholder="xxxxxx-xx-xxxx" 
                                onChange={(e) => setIcNumber(e.target.value)} 
                            />
                            {errors.icNumber && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800 ">{errors.icNumber}</p>}
                        </div>

                        <div className="input-group mt-2">
                            <label>Email: </label>
                            <input 
                                type="email" 
                                placeholder="john@gmail.com"
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                            {errors.email && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800 ">{errors.email}</p>}
                        </div>

                        <div className="input-group mt-2">
                            <label>Password: </label>
                            <input 
                                type="password" 
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                            {errors.password && <p className="error-text border-2 mt-2 mb-3 py-1 px-2 rounded-[5px] border-red-500 bg-red-200 text-red-800 ">{errors.password}</p>}
                        </div>

                        <p>Already have an account? <a href="/login">Login</a> here!</p>

                        <input
                            type="submit"
                            className="submit"
                            value={isSubmitting ? "Submitting..." : "Submit"}
                            disabled={isSubmitting} // Optionally disable button during submission
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PublicUserSignUpPage;
