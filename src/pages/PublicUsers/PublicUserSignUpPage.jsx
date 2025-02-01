import React, { useEffect, useState } from 'react';
import './PublicUserSignUpPage.css';
import HawkTuahLogo from "../../assets/hawkTuahLogo.svg"
import { supabase } from '../../utils/supabaseClient';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';

const PublicUserSignUpPage = () => {
    const [fullName, setFullName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [icNumber, setIcNumber] = useState();
    const [redirect, setRedirect] = useState(false)
    const { setId, setUserType } = useAuthStore.getState()

    async function handleSubmit(e) {
        e.preventDefault()

        const userId = await uploadUserData()
        const publicUserID = await uploadPublicUserData(userId)

        alert("Successfully signed up!")
        setId(publicUserID)
        setUserType("publicuser")
        setRedirect(true)
    }

    async function uploadUserData() {
        const { data: publicUserData, error } = await supabase
            .from('User')
            .insert({ 
                    fullName: fullName, 
                    password: password, 
                    icNumber: icNumber, 
                    email: email
                })
            .select()
            .single()

        if(error) {
            console.log(error);
            alert("Error occured! Unable to sign up.")
        }

        return publicUserData.userId
    }

    async function uploadPublicUserData(userID) {
        const { data: publicUserData, error } = await supabase
            .from('PublicUser')
            .insert({ 
                    userID: userID, 
                })
            .select()
            .single()

        if(error) {
            console.log(error);
            alert("Error occured! Unable to sign up.")
        }

        return publicUserData.publicUserID
    }



    if(redirect) {
        return <Navigate to="/publicuser/hawkers" replace />
    }

    return (
        <div>
            <div className="signUpContainer">
                
                    <div className="signUpForm">
                        <img src={HawkTuahLogo} alt="logo" />
                        <h1>Sign Up</h1>
                        <form action="" onSubmit={handleSubmit} >
                        <div className="name">
                            <label htmlFor="">Full Name</label>
                            <input type="text" placeholder='' onChange={(e) => setFullName(e.target.value)} />
                        </div>
                
                        <div className="icNumber">
                            <label htmlFor="">IC Number</label>
                            <input type="text" placeholder='xxxxxx-xx-xxxx' onChange={(e) => setIcNumber(e.target.value)} />
                        </div>

                        <div className="email">
                            <label htmlFor="">Email</label>
                            <input type="email" placeholder='' onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="password">
                            <label htmlFor="">Password</label>
                            <input type="text" placeholder='' onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        
                        <p>Already have an account? <a href="/login">Login</a> here!</p>
                
                        <input type="submit" className="submit" />
                        </form>
                     </div>
               
            </div>
        </div>
    );
};

export default PublicUserSignUpPage;