import React from "react";

const SearchResultList = ({ searchResults }) => {
  const handleResultClick = (url) => {
    window.open(url, "_blank");
  };
//insert webpage to venue
  return (
    <div className="search-results">
      {searchResults.map((result) => (
        <div key={result.id} className="search-result" onClick={() => handleResultClick(result.url)}>
          {result.name}
        </div>
      ))}
    </div>
  );
};

export default SearchResultList;