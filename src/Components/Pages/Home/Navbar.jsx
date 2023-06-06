import React, { useState } from "react";
import searchArtists from "../../../FetchArtists";

const Navbar = ({
  token,
  logout,
  AUTH_URL,
  setTotalResults,
  setArtists,
  setSearchKey,
  searchKey,
}) => {
  return (
    <nav>
      <h1
        className={`${token ? "text-green-500" : "text-red-500"} font-semibold`}
      >
        {token ? "connected" : "not connected"}
      </h1>
      {!token ? (
        <a href={AUTH_URL}>Login to Spotify</a>
      ) : (
        <button onClick={logout}>Logout</button>
      )}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          let data = await searchArtists(searchKey, token);
          if (data) {
            setArtists(data.tracks.items);
            setTotalResults(data.tracks.total);
          } else {
            return;
          }
        }}
      >
        <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
        <button type="submit">Search</button>
      </form>
    </nav>
  );
};

export default Navbar;
