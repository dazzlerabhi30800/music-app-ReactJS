import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import getRecentData from "../../../SpotifyAPI";
import { getNowPlaying } from "../../../SpotifyAPI";

const SearchBar = ({ setLoading, setSearchData }) => {
  const [searchInput, SetSearchInput] = useState();
  const [token, setToken] = useState();
  //   console.log(token);

  async function getToken() {
    let newToken = await getNowPlaying();
    setToken(newToken);
  }
  useEffect(() => {
    getToken();
  }, []);
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const data = await getRecentData(searchInput, token);
    console.log(data.tracks.items);
    setTimeout(() => {
      setLoading(false);
      setSearchData(data.tracks.items);
    }, 800);
  }
  return (
    <div className="search--wrapper">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="input"
          placeholder="search your song, artist or album"
          required
          //   pattern="\S+"
          pattern="\S+.*"
          //   value={searchInput}
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
