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
                <button className="userButton">
                    <img src={userPic} alt="testing" />
                    <p>Public User</p>
                </button>

                <button className="hawkerButton">
                    <img src={hawkerPic} alt="testing" />
                    <p>Hawker</p>
                </button>
                
            </div>
            </div>
        </div>
    );
};

export default AccountSelection;
