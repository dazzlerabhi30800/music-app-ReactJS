import React, { useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import getRecentData from "../../../SpotifyAPI";
import { getNowPlaying } from "../../../SpotifyAPI";

const SearchBar = ({ setLoading, setSearchData, token, setToken }) => {
  const [searchInput, SetSearchInput] = useState();
  const searchRef = useRef();
  // async function getToken() {
  //   let data = await getNowPlaying();
  //   setToken(data);
  // }
  // useEffect(() => {
  //   getToken();
  // }, []);
  //   console.log(token);
  async function handleSubmit(e) {
    e.preventDefault();
    if (token !== undefined) {
      setLoading(true);
      const data = await getRecentData(searchInput, token);
      searchRef.current.blur();
      // console.log(data.tracks.items);
      setTimeout(() => {
        setLoading(false);
        setSearchData(data.tracks.items);
      }, 800);
    } else {
      alert("Sign in To search");
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
