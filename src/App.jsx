import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./App.css";
import NavbarPC from "./Components/Pages/Navbars/NavbarPC";
import useResize from "./useResize";
import NavbarMobile from "./Components/Pages/Navbars/NavbarMobile";
import Home from "./Components/Pages/Home/Home";
import AudioPlayer from "./Components/Pages/Home/AudioPlayer";
import data from "./Components/Data/ArtistData.json";

function App() {
  const CLIENT_ID = import.meta.env.VITE_APP_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = "http://localhost:5173/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const AUTH_URL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&scope=user-read-currently-playing&&grant_type=client_credentials&Authorization=Basic`;
  const access_token = import.meta.env.VITE_APP_ACCESS_TOKEN_2;
  const windowWidth = useResize();

  const [token, setToken] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [artists, setArtists] = useState([]);

  const [searchKey, setSearchKey] = useState("");
  const [musicData, setMusicData] = useState(data.audiPlayerData);
  const [track, setTrack] = useState(
    JSON.parse(localStorage.getItem("track")) || musicData[0]
  );

  let audioRef = useRef(track && new Audio(track.audioSrc));
  const [offset, setOffset] = useState(2);
  const [more, setMore] = useState(true);
  const [totalResults, setTotalResults] = useState(0);

  const [isExpand, setIsExpand] = useState(false);

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

  useEffect(() => {
    const tokenData = window.localStorage.getItem("token");
    // setToken(token);
  }, []);

  useEffect(() => {
    if (track) {
      setTrack({ ...track, playing: false });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("track", JSON.stringify(track));
  }, [track]);

  const fetchArtists = async () => {
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_APP_ACCESS_TOKEN_2}`,
        // Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        limit: 8,
        offset: offset + 1,
        // type: "artist",
        type: "track,artist",
      },
    });
    if (data && searchKey.length > 2 && more) {
      let artistData = artists.concat(data.tracks.items);
      let filterData = artistData.filter(
        (a, i, b) => b.findIndex((t) => t.id === a.id) === i
      );
      setArtists(filterData);
      setOffset(offset + 1);
      setMore(artists.length >= totalResults ? false : true);
    }
  };

  return (
    <>
      <main className="main--container">
        {windowWidth > 600 ? (
          <NavbarPC
            token={token}
            logout={logout}
            AUTH_URL={AUTH_URL}
            setTotalResults={setTotalResults}
            setArtists={setArtists}
            searchKey={searchKey}
            setSearchKey={setSearchKey}
          />
        ) : (
          <NavbarMobile />
        )}
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
      {/* <a href={AUTH_URL}>Token</a> */}
    </>
  );
}

export default App;
