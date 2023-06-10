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
import { FaTshirt } from "react-icons/fa";
import { useLocation } from "react-router-dom";

function App() {
  const CLIENT_ID = import.meta.env.VITE_APP_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = "http://localhost:5173/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const access_token = import.meta.env.VITE_APP_ACCESS_TOKEN_2;
  const windowWidth = useResize();

  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // const [token, setToken] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [artists, setArtists] = useState([]);
  const redirect = window.location.href.replaceAll("/search", "/");
  const AUTH_URL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${redirect}&scope=user-read-currently-playing&&grant_type=client_credentials&Authorization=Basic`;
  console.log(redirect);

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
    setToken();
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

  const handleAuthorizeSpotify = () => {
    console.log("hello");
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
        {/* <a href={AUTH_URL}>Token</a> */}
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
