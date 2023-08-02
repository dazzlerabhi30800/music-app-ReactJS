import { useEffect, useState, useRef } from "react";
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
import LoadingBar from "react-top-loading-bar";

function App() {
  const CLIENT_ID = import.meta.env.VITE_APP_SPOTIFY_CLIENT_ID;
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const windowWidth = useResize();

  const [accessToken, setAccessToken] = useState(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [artists, setArtists] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const redirect = window.location.origin + "/";
  const AUTH_URL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${redirect}&scope=user-read-currently-playing&&grant_type=client_credentials&Authorization=Basic`;

  // Loading Bar Progress
  const [progress, setProgress] = useState(100);

  const [searchKey, setSearchKey] = useState("");
  const [musicData, setMusicData] = useState(
    JSON.parse(localStorage.getItem("music")) || data.audiPlayerData
  );
  const [track, setTrack] = useState(
    JSON.parse(localStorage.getItem("track")) || musicData[0]
  );

  let audioRef = useRef(track && new Audio(track.audioSrc));

  const [isExpand, setIsExpand] = useState(false);

  useEffect(() => {
    // setToken();
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
    setAccessToken(token);
    let storageToken = localStorage.getItem("token");
    if (token) {
      currentUserProfile(storageToken);
    } else {
      currentUserProfile(token);
    }
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
    let tokenNew = window.localStorage.getItem("token");
    setAccessToken(tokenNew);
  });
  // console.log(currentUser);

  const currentUserProfile = async (token) => {
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (!result.error) {
        setCurrentUser(result);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <main className="main--container">
        <LoadingBar
          color="#4ffb9f"
          height={3}
          progress={progress}
          transitionTime={200}
        />
        {windowWidth >= 700 ? <NavbarPC /> : <NavbarMobile />}
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
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
                auth={AUTH_URL}
                token={accessToken}
                setProgress={setProgress}
                setToken={setAccessToken}
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
