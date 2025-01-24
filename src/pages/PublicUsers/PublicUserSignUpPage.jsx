import React from 'react';
import './PublicUserSignUpPage.css';
import HawkTuahLogo from "../../assets/hawkTuahLogo.svg"

const PublicUserSignUpPage = () => {
    return (
        <div>
            <div className="signUpContainer">
                    <div className="signUpForm">
                        <img src={HawkTuahLogo} alt="logo" />
                        <h1>Sign Up</h1>

                        <div className="name">
                            <label htmlFor="">Full Name</label>
                            <input type="text" placeholder='' name='fullName' />
                        </div>
                
                        <div className="icNumber">
                            <label htmlFor="">IC Number</label>
                            <input type="text" placeholder='xxxxxx-xx-xxxx' name='icNumber' />
                        </div>

                        <div className="email">
                            <label htmlFor="">Email</label>
                            <input type="text" placeholder='' name='email' />
                        </div>

                        <div className="password">
                            <label htmlFor="">Password</label>
                            <input type="text" placeholder='' name='password' />
                        </div>
                        
                        <p>Already have an account? <a href="/login">Login</a> here!</p>
                
                        <button type='submit' className="submit">Submit</button>
                     </div>
            </div>
        </div>
    );
};

export default PublicUserSignUpPage;