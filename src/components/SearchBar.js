import React, { useState } from "react";
import axios from "axios";
import "./SearchBar.css";

export const SearchBar = ({ setSearch }) => {
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (value) => {
    setInput(value);
    setSearch(value);
    fetchData(value);
  };
  const fetchData = async (searchTerm) => {
    try {
      const response = await axios.get(`http://localhost:3001/search?term=${searchTerm}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="input-wrapper">
      <input
        placeholder="Search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
};