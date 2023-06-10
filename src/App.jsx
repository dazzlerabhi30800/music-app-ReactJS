import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./App.css";
import NavbarPC from "./Components/Pages/Navbars/NavbarPC";
import useResize from "./useResize";
import NavbarMobile from "./Components/Pages/Navbars/NavbarMobile";
import Home from "./Components/Pages/Home/Home";
import AudioPlayer from "./Components/Pages/Home/AudioPlayer";
import data from "./Components/Data/ArtistData.json";
import { Routes, Route } from "react-router-dom";
import LikedSongs from "./Components/Pages/LikedPage/LikedSongs";
import SearchPage from "./Components/Pages/SearchPage/SearchPage";
import { useNavigate } from "react-router-dom";

function App() {
  const CLIENT_ID = import.meta.env.VITE_APP_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = "http://localhost:5173/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const AUTH_URL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&scope=user-read-currently-playing&&grant_type=client_credentials&Authorization=Basic`;
  const access_token = import.meta.env.VITE_APP_ACCESS_TOKEN_2;
  const windowWidth = useResize();

  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // const [token, setToken] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [artists, setArtists] = useState([]);

  const [searchKey, setSearchKey] = useState("");
  const [musicData, setMusicData] = useState(
    JSON.parse(localStorage.getItem("music")) || data.audiPlayerData
  );
  const [track, setTrack] = useState(
    JSON.parse(localStorage.getItem("track")) || musicData[0]
  );

  let audioRef = useRef(track && new Audio(track.audioSrc));
  const [offset, setOffset] = useState(2);
  const [more, setMore] = useState(true);
  const [totalResults, setTotalResults] = useState(0);

  const [isExpand, setIsExpand] = useState(false);

  useEffect(() => {
    const getAccessToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      // Make a POST request to exchange the authorization code for an access token
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code: code,
          redirect_uri: "http://localhost:5173/",
          client_id: import.meta.env.VITE_APP_SPOTIFY_CLIENT_ID,
          client_secret: import.meta.env.VITE_APP_SPOTIFY_CLIENT_SECRET,
        }),
      });
      const { access_token } = await response.json();
      // console.log(access_token);
      if (access_token) {
        setToken(access_token);
      }
    };
    if (window.location.search.includes("code")) {
      getAccessToken();
    }
  }, []);
  const handleAuthorizeSpotify = () => {
    const clientId = CLIENT_ID;
    const redirectUri = "http://localhost:5173/";
    const scopes = ["user-read-private", "user-read-email"];

    // Redirect the user to the Spotify authorization URL
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
      "%20"
    )}&response_type=code`;
  };

  useEffect(() => {
    if (track) {
      setTrack({ ...track, playing: false });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("music", JSON.stringify(musicData));
  }, [musicData]);

  useEffect(() => {
    localStorage.setItem("track", JSON.stringify(track));
  }, [track]);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <>
      <main className="main--container">
        {/* <button onClick={handleAuthorizeSpotify}>Token</button> */}
        {windowWidth > 600 ? (
          <NavbarPC
            token={token}
            // logout={logout}
            AUTH_URL={AUTH_URL}
            setTotalResults={setTotalResults}
            setArtists={setArtists}
            searchKey={searchKey}
            setSearchKey={setSearchKey}
          />
        ) : (
          <NavbarMobile />
        )}
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                track={track}
                setTrack={setTrack}
                audioRef={audioRef}
                setMusicData={setMusicData}
                musicData={musicData}
                isExpand={isExpand}
              />
            }
          />
          <Route
            exact
            path="/liked"
            element={<LikedSongs musicData={musicData} />}
          />
          <Route
            exact
            path="/search"
            element={
              <SearchPage
                handleAuthorizeSpotify={handleAuthorizeSpotify}
                auth={AUTH_URL}
                token={token}
                setToken={setToken}
              />
            }
          />
        </Routes>
      </main>
      <AudioPlayer
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        track={track}
        setTrack={setTrack}
        audioRef={audioRef}
        setMusicData={setMusicData}
        musicData={musicData}
        isExpand={isExpand}
        setIsExpand={setIsExpand}
      />
    </>
  );
}

export default App;
