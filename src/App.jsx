import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import InfiniteScroll from "react-infinite-scroll-component";
import searchArtists from "./FetchArtists";
import SpotifyPlaying from "./SpotifyPlaying";
import Navbar from "./Components/Pages/Home/Navbar";
console.log("hello");

function App() {
  const CLIENT_ID = import.meta.env.VITE_APP_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = "http://localhost:5173/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const AUTH_URL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&scope=user-read-currently-playing&&grant_type=client_credentials&Authorization=Basic`;
  const access_token = import.meta.env.VITE_APP_ACCESS_TOKEN;

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

  const fetchArtists = async () => {
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
    if (data && searchKey.length > 2 && more) {
      let artistData = artists
        .concat(data.tracks.items)
        .filter((a, i, b) => b.findIndex((t) => t.id === a.id) === i);
      setArtists(artistData);
      setOffset(offset + 1);
      setMore(artists.length >= totalResults ? false : true);
    }
  };

  return (
    <>
      <main>
        <Navbar
          token={token}
          logout={logout}
          AUTH_URL={AUTH_URL}
          setTotalResults={setTotalResults}
          setArtists={setArtists}
          searchKey={searchKey}
          setSearchKey={setSearchKey}
        />
        <InfiniteScroll
          dataLength={artists.length}
          next={fetchArtists}
          hasMore={more}
          loader={<h1>Loading...</h1>}
        >
          <div className="artists--container">
            {artists &&
              artists.map((artist, index) => (
                <div
                  onClick={() => console.log(artist.artists[0].id)}
                  className="artists--wrapper"
                  key={artist.id}
                >
                  {artist.album.images.length ? (
                    <img
                      // loading="lazy"
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
                    className="text-lg mb-2 relative z-50"
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
      </main>
    </>
  );
}

export default App;
