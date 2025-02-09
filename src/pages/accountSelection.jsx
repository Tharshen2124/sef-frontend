import React from 'react';
import './accountSelection.css';

import userPic from '../assets/publicUser.png';
import hawkerPic from '../assets/hawker.png';


const AccountSelection = () => {
    return (
        <div>
            <div className="accountSelection">
                <h1>What kind of account would you like to register with?</h1>
            
            
            <div className="accountbuttons">
                <a href="/publicuser/signup" className="userButton">
                    <img className="account-icon" src={userPic} alt="testing" />
                    <p>Public User</p>
                </a>

                <a href="/hawker-signup" className="hawkerButton">
                    <img className="account-icon" src={hawkerPic} alt="testing" />
                    <p>Hawker</p>
                </a>
                
            </div>
            </div>
        </div>
    );
};

export default AccountSelection;
