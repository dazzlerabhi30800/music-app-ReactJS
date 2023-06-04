import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const CLIENT_ID = "3155b7d5669d4ce09f00e8e5f93d18de";
  const REDIRECT_URI = "http://localhost:5173/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const AUTH_URL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&scope=user-read-currently-playing&&grant_type=client_credentials&Authorization=Basic`;

  const [token, setToken] = useState("");
  const [artists, setArtists] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      window.location = hash;
      window.localStorage.setItem("token", token);
    }
    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const searchArtists = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "artist",
      },
    });
    setArtists(data.artists.items);
    // console.log(data.artists.items);
    // console.log(artists);
  };

  const renderArtists = () => {
    return artists.map((artist) => (
      <div key={artist.id}>
        {artist.images.length ? (
          <img width="100%" src={artist.images[0].url} alt="" />
        ) : (
          <div>No Image</div>
        )}
        {artist.name}
      </div>
    ));
  };

  return (
    <>
      <h1>Login To Spotify</h1>
      {!token ? (
        <a href={AUTH_URL}>Login to Spotify</a>
      ) : (
        <button onClick={logout}>Logout</button>
      )}
      <form onSubmit={searchArtists}>
        <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      {renderArtists()}
    </>
  );
}

export default App;
