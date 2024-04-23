// client/src/App.js

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import HomeBody from "./components/HomeBody.js";
import InviteFriend from "./components/inviteFriend.js";

//import "./index.css";
import NavBar from "./components/navBar";
import Home from './components/Home.js'
import ResetPassword from "./components/ResetPassword.js";
import ForgotPassword from "./components/ForgotPassword.js";
import PlayersPage from "./components/PlayersPage.js";
import { SearchBar } from "./components/SearchBar.js";
import VenueDetails from "./components/venueDetails.js";
import VenuesTable from "./components/ViewPage.js";
import ReviewBooking from "./components/reviewBooking.js";
import Paymethod from "./components/Payment.js";
import FriendInfo from "./components/friend_info.js";
import UserPage from "./components/userPage.js";
import EditProfileDetails from "./components/editProfileDetails.js";
import OwnerView from "./components/OwnerView.js";
import AddVenueForm from "./components/AddVenueForm.js";




function App() {


  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
          <Route path='/homeB' element={<HomeBody />}/>
          <Route path='/' element={<Home />}/>
          <Route path='/Login' element={<Login />}/>
          <Route path='/Register' element={<Register />} />
          <Route path='/player-page' element={<PlayersPage />} />
          <Route path='/reset-password' element={<ResetPassword />}/>
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/search' element={<SearchBar />} />
          <Route path='/venues' element={<VenuesTable />}/>
          <Route path='/review-booking?' element={<ReviewBooking />}/>
          <Route path='/payment' element={<Paymethod />}/>
          <Route path='/venue/venue-details?' element={<VenueDetails />}/>
         <Route path='/edit-profile-details' element={<EditProfileDetails />} />
          <Route path='/invite-friend' element={<InviteFriend />} />
          <Route path='/friend_info' element={<FriendInfo/>} />
          <Route path='/OwnerView' element={<OwnerView/>} />
          <Route path='/AddVenueForm' element={<AddVenueForm/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
