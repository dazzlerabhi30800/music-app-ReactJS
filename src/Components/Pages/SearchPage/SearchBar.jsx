import React, { useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import getRecentData from "../../../SpotifyAPI";

const SearchBar = ({
  setLoading,
  setSearchData,
  token,
  setToken,
  setProgress,
}) => {
  const [searchInput, SetSearchInput] = useState();
  const searchRef = useRef();
  async function handleSubmit(e) {
    setProgress(30);
    e.preventDefault();
    if (token !== undefined) {
      try {
        setLoading(true);
        const data = await getRecentData(searchInput, token);
        searchRef.current.blur();
        setProgress(50);
        setTimeout(() => {
          setProgress(100);
          setLoading(false);
          setSearchData(data.tracks.items);
        }, 800);
      } catch (error) {
        alert("You are not signed In");
        setProgress(100);
      }
    }
  }

  return (
    <div className="search--wrapper">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="input"
          placeholder="search your song, artist or album"
          required
          ref={searchRef}
          pattern="\S+.*"
          onChange={(e) => SetSearchInput(e.target.value)}
        />
        <button className="search--btn" type="submit">
          <FaSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
