import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import InfiniteScroll from "react-infinite-scroll-component";
import SpotifyPlaying from "./SpotifyPlaying";

function App() {
  const CLIENT_ID = import.meta.env.VITE_APP_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = "http://localhost:5173/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const AUTH_URL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&scope=user-read-currently-playing&&grant_type=client_credentials&Authorization=Basic`;

  const [token, setToken] = useState("");
  const [artists, setArtists] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [offset, setOffset] = useState(2);
  const [more, setMore] = useState(true);
  const [totalResults, setTotalResults] = useState(0);

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
        limit: 5,
        offset: 1,
        // type: "artist",
        type: "track",
      },
    });

    // console.log(data.tracks.total);
    if (data && searchKey.length > 2) {
      setArtists(data.tracks.items);
      setTotalResults(data.tracks.total);
      // console.log(totalResults);
      // console.log(data.tracks.items);
    }
  };

  const fetchArtists = async () => {
    console.log(totalResults);
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        limit: 5,
        offset: offset + 1,
        // type: "artist",
        type: "track",
      },
    });
    if (data && searchKey.length > 2) {
      setArtists(artists.concat(data.tracks.items));
      setOffset(offset + 1 > 8 ? 8 : offset + 1);
      setMore(artists.length >= totalResults ? false : true);
    }
  };

  return (
    <>
      <div>
        <h1
          className={`${
            token ? "text-green-500" : "text-red-500"
          } font-semibold`}
        >
          {token ? "connected" : "not connected"}
        </h1>
        {!token ? (
          <a href={AUTH_URL}>Login to Spotify</a>
        ) : (
          <button onClick={logout}>Logout</button>
        )}
        <form onSubmit={searchArtists}>
          <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
          <button type="submit">Search</button>
        </form>
        <InfiniteScroll
          dataLength={artists.length}
          next={fetchArtists}
          // hasMore={!artists.length >= totalResults}
          hasMore={more}
        >
          <div className="artists--container">
            {artists &&
              artists.map((artist, index) => (
                <div className="artists--wrapper" key={index}>
                  {artist.album.images.length ? (
                    <img
                      loading="lazy"
                      width="100%"
                      src={artist.album.images[0].url}
                      alt=""
                    />
                  ) : (
                    <div>No Image</div>
                  )}
                  <h2>{artist.name}</h2>
                  <span className="text-teal-500 uppercase font-medium">
                    {artist.artists[0].name}
                  </span>
                  <a
                    className="text-lg mb-2"
                    target="_blank"
                    href={artist.external_urls.spotify}
                  >
                    Link
                  </a>
                </div>
              ))}
          </div>
        </InfiniteScroll>
        {/* <SpotifyPlaying
          client_id={import.meta.env.VITE_APP_SPOTIFY_CLIENT_ID}
          client_secret={import.meta.env.VITE_APP_SPOTIFY_CLIENT_SECRET}
          refresh_token={import.meta.env.VITE_APP_SPOTIFY_REFRESH_TOKEN}
        /> */}
      </div>
    </>
  );
}

export default App;
