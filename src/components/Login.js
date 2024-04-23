

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const [info, setInfo] = useState({ email: "", password: "", otp: "" });
    const [loginInfo, setLoginInfo] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInfo(prevState => ({ ...prevState, [name]: value }));
    }

    const fetchLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(info),
            });

             window.localStorage.setItem('username', info.email);
            
            if (response.status === 200) {
                const data = await response.json();
                console.log("Login successful:", data);
            
                if (data.status === "pending") {
                    console.log(info)

                    
                    // window.localStorage.setItem("user_ID", data.data.userId);
                    window.localStorage.setItem('email', data.data.email);
                    // window.localStorage.setItem(
                    window.localStorage.setItem('username', info.email);
                    window.localStorage.setItem('userId', data.data.userId);
                    
                    setInfo({...info, userId: data.data.userId});
                    console.log("userId")
                    setLoginInfo(true); // Show OTP input  
                }
            } else {
                const errorData = await response.json();
                console.error("Login failed:", errorData);
                setErrorMessage(errorData.message || "Invalid email or password.");
            }
        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage("Login failed. Please try again.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/auth/verify`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": window.localStorage.getItem("token"),
                },
                body: JSON.stringify(info),
            });

            if (response.status === 200) {
                const data = await response.json();
                console.log("2fa verify successful:", data);
                window.localStorage.setItem('token', data.token);
                navigate("/");
                // window.location.reload();
            } else {
                const errorData = await response.json();
                console.error("2fa verify failed:", errorData);
                setErrorMessage(errorData.message || "Verification failed.");
            }
        } catch (error) {
            console.error("2fa verify error:", error);
            setErrorMessage("Verification failed. Please try again.");
        }
    };

    const gotoSignUpPage = () => navigate("/register");

    return (
        <GoogleOAuthProvider clientId="YOUR_CLIENT_ID">
            <div className="loginBody">
                <div className='loginContainer'>
                    <div className="logo">
                        <img src={logo} width={250} height={85} alt='Logo' />
                    </div>
                    <h2>Login </h2>
                    <div className="oauthContainer">
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                const email = jwtDecode(credentialResponse.credential)?.email;
                                if (email) {
                                    setInfo(prevState => ({ ...prevState, email }));
                                    fetchLogin();
                                }
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                    </div>

                    <form className='loginForm' data-testid='loginForm' onSubmit={handleSubmit}>
                        <div className="inputBox">
                            <i className='bx bxs-envelope' />
                            <input
                                placeholder="Email"
                                type='email'
                                id='email'
                                name='email'
                                value={info.email}
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <div className="inputBox">
                            <i className="bx bxs-lock-alt"></i>
                            <input
                                placeholder="Password"
                                type='password'
                                name='password'
                                id='password'
                                minLength={8}
                                required
                                value={info.password}
                                onChange={handleChange}
                            />
                        </div>
                        <button className="loginBtn" onClick={fetchLogin}> Login </button>
                        {loginInfo &&
                            <>
                                <div className="inputBox">
                                    <i className="bx bxs-lock-alt"></i>
                                    <input
                                        placeholder="Enter OTP"
                                        type='text'
                                        name='otp'
                                        id='otp'
                                        minLength={4}
                                        maxLength={4}
                                        required
                                        value={info.otp}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button className="loginBtn" type="submit"> Submit </button>
                            </>
                        }
                        {errorMessage && (
                            <p className="error" style={{ color: "red" }}>
                                <span className="error-text">{errorMessage}</span>
                            </p>
                        )}
                        <div className="forgot">
                            Forgot password?{" "}
                            <Link to="/forgot-password" className="forgotPasswordLink">
                                Click here
                            </Link>
                        </div>
                        <p>
                            Don't have an account?{" "}
                            <span className='link' data-testid="toSignin" onClick={gotoSignUpPage}>
                                Sign up
                            </span>
                        </p>
                    </form>
                </div>
            </div>
        </GoogleOAuthProvider>
    );
};

export default Login;
