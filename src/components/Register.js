import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import ReCAPTCHA from "react-google-recaptcha";

const Register = () => {
    const [info, setInfo] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const recaptchaRef = useRef();
    const API_URL = process.env.REACT_APP_API_URL;

    const navigate = useNavigate();

    const handleChange = (event) => {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        setInfo((values) => ({ ...values, [name]: value }));
        
        // Clear error message
        setErrorMessage("");
        setShowErrorMessage(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(info),
            });
    
            if (response.ok) {
                console.log("Registration successful:");
                setSuccessMessage("Registration successful. Redirecting to the Login page...");
                setShowSuccessMessage(true);
    
                setTimeout(() => {
                    navigate("/login"); // Call navigate directly to redirect
                }, 3000);
    
                window.localStorage.setItem("userId", info.username);
                window.localStorage.setItem("role", info.role);
                window.localStorage.setItem("userEmail", info.email);
                window.localStorage.setItem("username", info.username);
            } else {
                const errorData = await response.text();
                console.error("Registration failed:", errorData);
                setErrorMessage(errorData);
                setShowErrorMessage(true);
            }
        } catch (error) {
            console.error("Registration error:", error);
            setErrorMessage("Registration failed. Please try again.");
            setShowErrorMessage(true);
        }
    };

    const gotoLoginPage = () => navigate("/login");
    const gotoFriendPage = () => navigate("/friend_info");

    useEffect(() => {
        if (showSuccessMessage) {
            setTimeout(() => {
                setSuccessMessage("");
                setShowSuccessMessage(false);
            }, 10000);
        }
    }, [showSuccessMessage]);

    return (
        <div className="signupBody">
            <div className="signupContainer">
                <div className="logo">
                    <img src={logo} width={250} height={85} alt="Logo" />
                </div>
                <h2>Sign up</h2>
                <form className="signupForm" data-testid="registerForm" onSubmit={handleSubmit}>
                    <div className="inputBox">
                        <i className="bx bxs-envelope" />
                        <input
                            placeholder="Email"
                            type="email"
                            name="email"
                            id="email"
                            value={info.email}
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className="inputBox">
                        <i className="bx bxs-user" />
                        <input
                            placeholder="Username"
                            type="text"
                            id="username"
                            name="username"
                            value={info.username}
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className="inputBox">
                        <i className="bx bxs-lock-alt"></i>
                        <input
                            placeholder="Password"
                            type="password"
                            name="password"
                            id="password"
                            minLength={8}
                            required
                            value={info.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="inputBox">
                        <i className="bx bxs-lock-alt"></i>
                        <input
                            placeholder="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            minLength={8}
                            required
                            value={info.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="inputBox">
                        <select name="role" id="role" value={info.role} onChange={handleChange} required>
                            <option>Role Type</option>
                            <option value={"Attendee"}>Attendee</option>
                            <option value={"Admin"}>Admin</option>
                            <option value={"Organizer"}>Organizer</option>
                        </select>
                    </div>
                    <ReCAPTCHA ref={recaptchaRef} sitekey={"YOUR_RECAPTCHA_SITE_KEY"} required />
                    <button className="signupBtn" data-testid="register">
                        Sign Up
                    </button>
                    {showErrorMessage && <p className="error" style={{ color: "red" }}>{errorMessage}</p>}
                </form>
                <p>
                    Already have an account?{" "}
                    <span className="link" onClick={gotoLoginPage}>
                        Login
                    </span>
                </p>
                {showSuccessMessage && (
                    <div className="inviteFriendMessageContainer">
                        <p className="inviteFriendMessage">{successMessage}</p>
                    </div>
                )}

                <div className="inviteFriendMessageContainer">
                  <p className="inviteFriendMessage"></p>
                  <button className="inviteFriendButton" onClick={gotoFriendPage}>
                    Invite Friend
                  </button>
                </div>
            </div>
        </div>
    );
};

export default Register;
