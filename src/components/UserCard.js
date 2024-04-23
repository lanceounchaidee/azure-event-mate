import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

function UserCard() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const email = localStorage.getItem("email");
            try {
                const response = await fetch(`${API_URL}/profile?email=${email}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.status === 200) {
                    const userData = await response.json();
                    setUserInfo(userData);
                } else {
                    console.error("Failed to fetch user profile");
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUserProfile();
    }, []);

    const handleEditProfileDetails = () => {
        navigate("/edit-profile-details");
    };

    return (
        <div>
            <div className="UserCard">
                <div className="CardContent">
                    <h3 className="UserCardTitle">My Account</h3>
                     
                    {userInfo &&( 
                     <div className='displayStack'>
                          <div className="info">Username - {userInfo.username}</div>
                          <div className="info">Email - {userInfo.email}</div>
                          <div className="info">Role - {userInfo.role}</div>  
                     </div>
                    )}

                     <div className="display2">
                        <Button onClick={handleEditProfileDetails}>Edit Account</Button>
                     </div> 


                </div>
            </div>
        </div>
    );
}

export default UserCard;
