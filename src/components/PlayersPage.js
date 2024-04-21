// import React, { useEffect, useState } from 'react';
// import PlayerCard from "./PlayerCard";
// import { SearchBar } from "./SearchBar";

// function PlayersPage() {
//   const [players, setPlayers] = useState([
//     {
//       player_id: 1,
//       player_name: "John Doe",
//       sport_activity_name: "Tennis",
//       gender: "Male",
//       age: 25,
//       skill_level: "Intermediate",
//       available: 1
//     },
//     {
//       player_id: 2,
//       player_name: "Jane Smith",
//       sport_activity_name: "Basketball",
//       gender: "Female",
//       age: 30,
//       skill_level: "Advanced",
//       available: 0
//     },
//     {
//       player_id: 3,
//       player_name: "Michael Johnson",
//       sport_activity_name: "Football",
//       gender: "Male",
//       age: 28,
//       skill_level: "Intermediate",
//       available: 0
//     },
//     {
//       player_id: 4,
//       player_name: "Emily Brown",
//       sport_activity_name: "Swimming",
//       gender: "Female",
//       age: 22,
//       skill_level: "Beginner",
//       available: 1
//     },
//     {
//       player_id: 5,
//       player_name: "David Wilson",
//       sport_activity_name: "Running",
//       gender: "Male",
//       age: 35,
//       skill_level: "Advanced",
//       available: 1
//     },
//     {
//       player_id: 6,
//       player_name: "Sarah Johnson",
//       sport_activity_name: "Golf",
//       gender: "Female",
//       age: 40,
//       skill_level: "Intermediate",
//       available: 1
//     },
//     {
//       player_id: 7,
//       player_name: "Robert Smith",
//       sport_activity_name: "Soccer",
//       gender: "Male",
//       age: 27,
//       skill_level: "Advanced",
//       available: 0
//     },
    // {
    //   player_id: 8,
    //   player_name: "Jessica Brown",
    //   sport_activity_name: "Volleyball",
    //   gender: "Female",
    //   age: 29,
    //   skill_level: "Intermediate",
    //   available: 1
    // },
//     {
//       player_id: 9,
//       player_name: "Christopher Taylor",
//       sport_activity_name: "Cycling",
//       gender: "Male",
//       age: 32,
//       skill_level: "Advanced",
//       available: 1
//     },
//     {
//       player_id: 10,
//       player_name: "Amanda Miller",
//       sport_activity_name: "Yoga",
//       gender: "Female",
//       age: 26,
//       skill_level: "Intermediate",
//       available: 0
//     },
//     // Add more dummy data as needed
//   ]);
//   const [search, setSearch] = useState('');
//   const [selectedAgeRange, setSelectedAgeRange] = useState('');
//   const [isAvailableChecked, setIsAvailableChecked] = useState(false);

//   const handleAgeRangeChange = (e) => {
//     setSelectedAgeRange(e.target.value);
//   };

//   const handleAvailableChange = (e) => {
//     setIsAvailableChecked(e.target.checked);
//   };

//   return (
//     <div className="PlayersViewHost">
//       <div className="PlayersBody">
//         <form className='searchForm'>
//         <SearchBar setSearch={setSearch} />
//           <div>
//             <label htmlFor="ageRange">Filter by Age Range:{" "}
//               <select id="ageRange" onChange={handleAgeRangeChange} value={selectedAgeRange}>
//                   <option value="">All</option>
//                   <option value="18-22">18-22</option>
//                   <option value="23-30">23-30</option>
//                   <option value="31-40">31-40</option>
//                   <option value="40+">40+</option>
//               </select>
//             </label>
//           </div>
//           <div className='playerCheckbox'>
//           {" "} 
//             <label>
//               Available {" "}
//               <input className="checkbox" type="checkbox" checked={isAvailableChecked} onChange={handleAvailableChange} />
//             </label>
//           </div>
//         </form>
//         <div className='thePlayers'>
//           {players
//             .filter((item) => {
//               return (
//                 (search.toLowerCase() === '' ||
//                   item.gender.toLowerCase().includes(search) ||
//                   item.sport_activity_name.toLowerCase().includes(search) ||
//                   item.skill_level.toLowerCase().includes(search) ||
//                   item.player_name.toLowerCase().includes(search)) &&
//                 (selectedAgeRange === '' ||
//                   (selectedAgeRange === '18-22' && item.age >= 18 && item.age <= 22) ||
//                   (selectedAgeRange === '23-30' && item.age >= 23 && item.age <= 30) ||
//                   (selectedAgeRange === '31-40' && item.age >= 31 && item.age <= 40) ||
//                   (selectedAgeRange === '41+' && item.age >= 41)) &&
//                 (!isAvailableChecked || (isAvailableChecked && item.available === 1))
//               );
//             })
//             .map((player) => (
//               <PlayerCard
//                 key={player.player_id}
//                 id={player.player_id}
//                 player_name={player.player_name}
//                 sport_activity_name={player.sport_activity_name}
//                 gender={player.gender}
//                 age={player.age}
//                 skill_level={player.skill_level}
//                 available={player.available}
//               />
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PlayersPage;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlayerCard from "./PlayerCard";

function PlayersPage() {
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedAgeRange, setSelectedAgeRange] = useState('');
  const [isAvailableChecked, setIsAvailableChecked] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/player-list`, {});
      setPlayers(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAgeRangeChange = (e) => {
    setSelectedAgeRange(e.target.value);
  };

  const handleAvailableChange = (e) => {
    setIsAvailableChecked(e.target.checked);
  };

  return (
    <div className="PlayersViewHost">
      <div className="PlayersBody">
        <form className='searchForm'>
          <input className="searchInput" placeholder="Search Players" onChange={(e) => setSearch(e.target.value)} />
          <div>
            <label htmlFor="ageRange">Filter by Age Range:{" "}
              <select id="ageRange" onChange={handleAgeRangeChange} value={selectedAgeRange}>
                  <option value="">All</option>
                  <option value="18-22">18-22</option>
                  <option value="23-30">23-30</option>
                  <option value="31-40">31-40</option>
                  <option value="40+">40+</option>
              </select>
            </label>
          </div>
          <div className='playerCheckbox'>
          {" "} 
            <label>
              Available {" "}
              <input className="checkbox" type="checkbox" checked={isAvailableChecked} onChange={handleAvailableChange} />
            </label>
          </div>
        </form>
        <div className='thePlayers'>
          {players
            .filter((item) => {
              return (
                (search.toLowerCase() === '' || item.gender.toLowerCase().includes(search) ||
                  item.sport_activity_name.toLowerCase().includes(search) ||
                  item.skill_level.toLowerCase().includes(search)) &&
                (selectedAgeRange === '' ||
                  (selectedAgeRange === '18-22' && item.age >= 18 && item.age <= 22) ||
                  (selectedAgeRange === '23-30' && item.age >= 23 && item.age <= 30) ||
                  (selectedAgeRange === '31-40' && item.age >= 31 && item.age <= 40) ||
                  (selectedAgeRange === '41+' && item.age >= 41)) &&
                (!isAvailableChecked || (isAvailableChecked && item.available === 1))
              );
            })
            .map((player) => (
              <PlayerCard
                key={player.player_id}
                id={player.player_id}
                player_name={player.player_name}
                sport_activity_name={player.sport_activity_name}
                gender={player.gender}
                age={player.age}
                skill_level={player.skill_level}
                available={player.available}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default PlayersPage;
