import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";

const ForgotPassword = () => {
    const [emailOrUsername, setEmailOrUsername] = useState("");
    const [captchaValue, setCaptchaValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleEmailOrUsernameChange = (event) => {
        setEmailOrUsername(event.target.value);
    };

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    const handleResendEmail = () => {
        if (!captchaValue) {
            setErrorMessage("Please complete the captcha verification.");
            return;
        }
        // send email from backend

        // Reset form state
        setEmailOrUsername("");
        setCaptchaValue("");
        setErrorMessage("");
    };

    const gotoLoginPage = () => navigate("/login");

    return (
        <div className="loginBody">
            <div className="loginContainer">
                <div className="logo">
                    <img src={logo} width={250} height={85} alt="Logo" /> {/* Use the logo image */}
                </div>
                <h2>Forgot Password</h2>
                <form className="loginForm">
                    <div className="inputBox">
                        <i className="bx bxs-envelope" />
                        <input
                            placeholder="Email or Username"
                            type="text"
                            value={emailOrUsername}
                            onChange={handleEmailOrUsernameChange}
                        />
                    </div>
                    <ReCAPTCHA
                        sitekey={"YOUR_RECAPTCHA_SITE_KEY"}
                        onChange={handleCaptchaChange}
                    />
                    {errorMessage && <p className="error">{errorMessage}</p>}
                    <button className="loginBtn" onClick={handleResendEmail}>
                        Resend Email
                    </button>
                </form>
                <div className="forgot">
                    Login?{" "}
                    <Link to="/login" className="forgotPasswordLink" onClick={gotoLoginPage}>
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
