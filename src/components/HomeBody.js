// // import React, { useState, useEffect  } from "react";
// // import { Link,useNavigate } from "react-router-dom";
// // import img from "../assets/HomeImage.jpg";
// // import bgimg from "../assets/backgroundImage.jpg";
// // import { Button } from "./Button";
// // import './homeBody.css';
// // import ReservationsCard from "./ReservationsCard";

// // const HomeBody = () => {
// //     const navigate = useNavigate();
// //     const [search, setSearch] = useState('');
// //     const [reservations, setReservations] = useState([]);
// //     const userId = "dummyUserId123";
// //     // const [profileData, setProfileData] = useState({
// //     //     user_id: "dummyUserId123",
// //     //     username: "dummyUsername",
// //     //     email: "dummy@example.com",
// //     //     role: "user"
// //     // });
  

// //     return (
// //         <div className="homeContainer">
// //             <img className="bgImage" src={bgimg} alt="Background" />
// //             <img className="homeImg" src={img} alt="Home" style={{ maxWidth: "50em" }} />
// //             <div className="theHome">
// //                 <div className="homeBodyButtons">
// //                     <Link to="/venues">
// //                         <Button className='buttons' buttonStyle="buttonOutline" buttonSize="buttonLarge">
// //                             RESERVE NOW
// //                         </Button>
// //                     </Link>
// //                 </div>

// //                 {userId != null && <div className="ChildLeft">
// //                     <h3>Reservations:</h3>
// //                     <div className='ReservationSearch'>
// //                       <input className="searchInput" placeholder="Search Reservations" onChange={(e) => setSearch(e.target.value)}/>
// //                     </div>
// //                     {reservations.filter((item) => {
// //                     return search.toLowerCase() === '' ? item 
// //                         : 
// //                         (item.username.toLowerCase().includes(search)
// //                         ||
// //                         item.start_datetime.toLowerCase().includes(search)
// //                         ||
// //                         item.end_datetime.toLowerCase().includes(search));
// //                     })
// //                     .map((reservation) => (
// //                         <ReservationsCard
// //                           key={reservation.venue_id}
// //                           id={reservation.venue_id}
// //                           vname={reservation.vname}
// //                           start_datetime={reservation.start_datetime}
// //                           end_datetime={reservation.end_datetime}
// //                           value_paid={reservation.value_paid === 1 ? 'Paid' : 'Not Paid'}
// //                         />
// //                     ))}
// //                   </div>}

// //             </div>
// //         </div>
// //     )
// // }

// // export default HomeBody;

// import React, { useState, useEffect  } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import img from "../assets/HomeImage.jpg";
// import bgimg from "../assets/backgroundImage.jpg";
// import { Button } from "./Button";
// import './homeBody.css';
// import axios from 'axios';
// import ReservationsCard from "./ReservationsCard";

// const HomeBody = () =>{
//     const navigate = useNavigate();
//     const [search, setSearch] = useState('');
//     const [reservations, setReservations] = useState([]);
//     const userId = window.localStorage.getItem("userId");
//     const API_URL = process.env.REACT_APP_API_URL;

//     // state variable to store the profile data
//     const [profileData, setProfileData] = useState(
//       {
//         userId: window.localStorage.getItem('userId') || "",
//         username: window.localStorage.getItem('username') || "",
//         email: window.localStorage.getItem('userEmail') || "",
//         role: window.localStorage.getItem('role') || ""
//       }
//     );

//     const fetchReservations = async () => {
//         try {
//           const response = await axios.post(`${API_URL}/user-reservation-details`, { userId: window.localStorage.getItem('userId') });
//           console.log(response.data);
//           // Assuming response.data is an array, set reservations with the response data
//           setReservations(response.data);
//         } catch (error) {
//           console.error('Error fetching reservations:', error.message);
//         }
//       };
      

//     useEffect(() => {
//       fetchReservations();
//     }, []);

//     return(
//         <div className="homeContainer">
//           <img className="bgImage" src={bgimg}/>
//             <img className="homeImg" src={img} style={{maxwidth: 50% + "em" }}/>
//             <div className="theHome">
//                 <div className="homeBodyButtons">
//                     <Link to="/venues">
//                         <Button className='buttons' buttonStyle="buttonOutline" buttonSize="buttonLarge">
//                             RESERVE NOW
//                         </Button>
//                     </Link>
//                 </div>

//                 {userId != null && <div className="ChildLeft">
//                     <h3>Reservations:</h3>
//                     <div className='ReservationSearch'>
//                       <input className="searchInput" placeholder="Search Reservations" onChange={(e) => setSearch(e.target.value)}/>
//                     </div>
//                     {reservations.filter((item) => {
//                     return search.toLowerCase() === '' ? item 
//                         : 
//                         (item.username.toLowerCase().includes(search)
//                         ||
//                         item.start_datetime.toLowerCase().includes(search)
//                         ||
//                         item.end_datetime.toLowerCase().includes(search));
//                     })
//                     .map((reservation) => (
//                     <ReservationsCard
//                       key={reservation._id}
//                       id={reservation._id}
      
//                       start_datetime={(reservation.date.split("T")[0] + " " + reservation.startTime)}
//                       end_datetime={reservation.endTime}
//                       value_paid={'Paid'}
//                     />
//                     ))}
//                   </div>}
//               </div>
//         </div>
//     )
    
// }
// export default HomeBody;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import img from "../assets/HomeImage.jpg";
import bgimg from "../assets/backgroundImage.jpg";
import { Button } from "./Button";
import axios from 'axios';
import ReservationsCard from "./ReservationsCard";

const HomeBody = () => {
    const [search, setSearch] = useState('');
    const [reservations, setReservations] = useState([]);
    const userId = window.localStorage.getItem("userId");
    const API_URL = process.env.REACT_APP_API_URL;

    const fetchReservations = async () => {
        try {
            const response = await axios.post(`${API_URL}/user-reservation-details`, { userId: window.localStorage.getItem('userId') });
            console.log(response.data);
            setReservations(response.data);
        } catch (error) {
            console.error('Error fetching reservations:', error.message);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    return (
        <div className="homeContainer">
            <img className="bgImage" src={bgimg} alt="Background" />
            <img className="homeImg" src={img} alt="Home" style={{ maxWidth: "50em" }} />
            <div className="theHome">
                <div className="homeBodyButtons">
                    <Link to="/venues">
                        <Button className='buttons' buttonStyle="buttonOutline" buttonSize="buttonLarge">
                            RESERVE NOW
                        </Button>
                    </Link>
                </div>

                {userId && (
                    <div className="ChildLeft">
                        <h3>Reservations:</h3>
                        <div className='ReservationSearch'>
                            <input className="searchInput" placeholder="Search Reservations" onChange={(e) => setSearch(e.target.value)} />
                        </div>
                        {reservations.map((reservation) => (
                            <ReservationsCard
                                key={reservation._id}
                                id={reservation._id}
                                vname={reservation.v_name}
                                start_datetime={(reservation.date && reservation.startTime) ? `${reservation.date.split("T")[0]} ${reservation.startTime}` : ''}
                                end_datetime={(reservation.date && reservation.endTime) ? `${reservation.date.split("T")[0]} ${reservation.endTime}` : ''}
                                value_paid={'Paid'}
                            />
                        ))}
                    </div>
                )}

            </div>
        </div>
    )
}

export default HomeBody;
