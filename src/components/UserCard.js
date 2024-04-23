// import React, { useState } from "react";
// import { Button } from "./Button";
// import { useNavigate } from "react-router-dom";

// const API_URL = process.env.REACT_APP_API_URL;
// function UserCard(props) {

//     const navigate = useNavigate();

//     const handleEditProfileDetails = () => {
//         navigate("/edit-profile-details");
//         window.location.reload();
//     };

    


//     const user = async (e) => {
//         e.preventDefault()
//         try {
//             const response = await fetch(`${API_URL}/routes/pages`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 // body: JSON.stringify(info),

                
//             });


//             if (response.status === 200) {
//                 const data = await response.json();
//                 console.log("Profile successful:", data);
                
//                 // window.localStorage.setItem("role", info.role);
//                 // window.localStorage.setItem("userEmail", data.email);
//                 // window.localStorage.setItem("username", info.username);

            
//                 if (data.status === "pending") {
//                     // // console.log(info)
//                     // window.localStorage.setItem('username', info.email);
                    
//                     // window.localStorage.setItem("userId", data.userId);
//                     // window.localStorage.setItem("userId", data.user.user_id);
//                     // setLoginInfo(true); // Show OTP input  
//                 }
//             } else {
//                 const errorData = await response.json();
//                 console.error("Failed to fetch user profile");
//                 // setErrorMessage(errorData.message || "Invalid email or password.");
//             }
//         } catch (error) {
//             console.error("Error fetching user profile:", error);
//             // setErrorMessage("Login failed. Please try again.");
//         }
//     };

//     console.log(localStorage.getItem("user_ID"))

//     window.localStorage.getItem("userId");
//     window.localStorage.getItem("role");
//     window.localStorage.getItem("userEmail");
//     window.localStorage.getItem("username");

//     return(
//         <div>
//             <div key={props.userId} className="UserCard">
//                 <div className="CardContent">
//                     <h3 className="UserCardTitle"> My Account </h3>
//                     <div className='displayStack'>
//                         <div className="info">{"User ID - "+window.localStorage.getItem('userId')}</div>
//                         <div className="info">{"Username - "+window.localStorage.getItem('username')}</div>
//                         <div className="info">{"Email - "+window.localStorage.getItem('email')}</div>
//                         <div className="info">{"Role - "+window.localStorage.getItem('role')}</div>
//                     </div>
//                     <div className="display2">
//                         <Button onClick={handleEditProfileDetails}>Edit Account</Button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// };

// export default UserCard;


import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

function UserCard(  ) {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const email = localStorage.getItem("email")
    console.log(localStorage.getItem("email"))
    // const email = window.localStorage.getItem('username');

    const fetchUserProfile = async () => {
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

                window.localStorage.setItem('role',userInfo.role)
                console.log(localStorage.getItem("role"))
                console.log(userData)

                // console.log(userInfo)
            } else {
                console.error("Failed to fetch user profile");
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };

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

