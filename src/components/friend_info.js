import React, { useState, useRef, useEffect } from "react";
import  axios from "axios";

const FriendInfo = () => {
    const [friendEmail, setFriendEmail] = useState("");
    const [successMessage, setSuccessMessage] = useState("");   
    const [errorMessage, setErrorMessage] = useState("");

    const API_URL = process.env.REACT_APP_API_URL;

    const handleInviteFriend = async () => {
        try {
            // Make an API call to your backend to trigger the inviteFriend function
            const response = await fetch(`${API_URL}/inviteFriend`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({friendEmail}),
            });

            if (response.status) {
                const data = await response.json();
                console.log("Invitation sent successfully!", data);
                setSuccessMessage("Invitation sent successfully!");
                setErrorMessage("");
    
            }
                else {
                    const errorData = await response.text(); // Parse the response as text
                    console.error("Invite failed:", errorData);
        
                    // Display the error message received from the backend
                    setErrorMessage(errorData);
                    // setShowErrorMessage(true);
                }
            } catch (error) {
                console.error("Invite error:", error);
                setErrorMessage("Invite failed. Please try again."); // Display a generic error message for network or other errors
                // setShowErrorMessage(true);
            }

            // console.log(response.data);
            // // Handle success or display a message to the user
            // setSuccessMessage("Invitation sent successfully!");
            // setErrorMessage("");
        // } catch (error) {
        //     console.error('Error inviting friend:', error.message);
        //     // Handle error or display an error message to the user
        //     setErrorMessage("Error sending invitation. Please try again.");
        //     setSuccessMessage("");
        // }
    };

    return (
        <div className="inviteFriendContainer">
            <h2>Invite a Friend</h2>
            <div>
                <input
                    placeholder="Friend's Email"
                    type="email"
                    value={friendEmail}
                    onChange={(e) => setFriendEmail(e.target.value)}
                />
                <button className="inviteFriendButton" onClick={handleInviteFriend}>Send Invitation</button>
            </div>
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
    );

};

export default FriendInfo;