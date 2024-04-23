import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

function EditProfile() {
    const navigate = useNavigate();
    const [editInfo, setEditInfo] = useState({});

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const email = localStorage.getItem("email");
            const response = await fetch(`${API_URL}/profile?email=${email}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                const userData = await response.json();
                setEditInfo(userData);
            } else {
                console.error("Failed to fetch user profile");
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/profile`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editInfo),
            });

            if (response.status === 200) {
                navigate("/");
                console.log("PROFILE UPDATED SUCCESSFULLY")
            } else {
                console.error("Failed to update profile");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <div className='signupBody'>
            <div className='signupContainer'>
            <h2>Edit Profile Details:</h2>
            <form className='signupForm' data-testid='registerForm' onSubmit={handleSubmit}>
                <div style={{ marginBottom: "1rem" }}>
                    <label style={{ marginRight: "1rem" }}>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={editInfo.username || ""}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                    <label style={{ marginRight: "1rem" }}>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={editInfo.email || ""}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                    <label style={{ marginRight: "1rem" }}>Role:</label>
                    <input
                        type="text"
                        name="role"
                        value={editInfo.role || ""}
                        onChange={handleChange}
                    />
                </div>
                <Button type="submit">Save Changes</Button>
            </form>
            </div>
        </div>
    );
}

export default EditProfile;
