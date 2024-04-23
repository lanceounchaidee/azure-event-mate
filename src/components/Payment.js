import React, { useState } from "react";
import logo from "../assets/logo.png"
import { Button } from "./Button";
import NavBar from "./navBar";
import { useNavigate } from "react-router-dom";
import withAuth from './withAuth';

const Paymethod = () => {
    const paymentParams = new URLSearchParams(window.location.search);
    const venueId = paymentParams.get('venueid');
    const startTime = paymentParams.get("startTime");
    const endTime = paymentParams.get("endTime");
    const [message, setMessage] = useState('');
    const date = paymentParams.get('date');
    const [info, setInfo] = useState({});
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;

    const handleChange = (event) =>{
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;

        setInfo(values => ({...values, [name]: value}))
    }
    var finishPayment=()=>{
        alert("payment successful");
    }
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            const response = await fetch(`${API_URL}/book-venue`,{
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                "Authorization": window.localStorage.getItem("token")
            },
            body: JSON.stringify({venueId, startTime, endTime, bookDate: date}),
        });
        console.log(response); 
        if(response.ok){
            const data = await response.json();
            console.log("payment successful:", data)
            alert("payment Successful");
            navigate("/");
            window.location.reload();
        }else{
            const errorData = await response.json();
             setMessage(errorData.message); 
            console.error("payment Failed:", errorData);
        }
        }catch(error){
            console.error("not valid:", error);
        }
    }
    return(

        <div className='signupBody'>
        <div className='signupContainer'>
            <div className="logo">
                <img src={logo }width={250} height={85} alt='Logo'></img>
            </div>
            <h2>Payment</h2>
            <form className = 'paymentInfo' data-testid='paymentInfo' onSubmit={handleSubmit}>  
                <div className="inputBox">
                <i className='bx bxs-number'/>
                    <input
                        placeholder="CardNumber"
                        type='number'
                        name='number'
                        id='number'
                        minLength={16}
                        value={info.number}
                        required
                        onChange={handleChange}
                    />

                </div>
                <div className="inputBox">
                <i className='bx bxs-text'></i>
                    <input
                        placeholder="Card Holder Name"
                        type='text'
                        name='name'
                        id='name'
                        value={info.name}
                        required
                        onChange={handleChange}
                />
                </div>
                <div className="inputBox">
                <i className="bx bxs-number"/>
                    <input  
                        placeholder="EXP Date"
                        type='experationDate'
                        id='date'
                        name='date'
                        minLength={5}
                        value={info.date}
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="inputBox">
                <i className="bx bxs-number"></i>
                    <input  
                        placeholder="CVV"
                        type="number"
                        name="cvv"
                        id='cvv'
                        minLength={3}
                        required
                        value={info.cvv}
                        onChange={handleChange}
                    />
                </div>
                    <Button className ="signupBtn" onClick={handleSubmit}>
                        Submit
                    </Button>
                  {message && <p className="error-message">{message}</p>} {/* Display error message if exists */}
            </form>
        </div>
        </div>
    );
};
export default withAuth(Paymethod);
