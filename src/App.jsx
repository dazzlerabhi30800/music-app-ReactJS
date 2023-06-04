import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import SpotifyPlaying from "./SpotifyPlaying";

function App() {
  return (
    <>
      <div>
        <h1 className="text-red-500 underline">not connected</h1>
        <SpotifyPlaying
          client_id={import.meta.env.VITE_APP_SPOTIFY_CLIENT_ID}
          client_secret={import.meta.env.VITE_APP_SPOTIFY_CLIENT_SECRET}
          refresh_token={import.meta.env.VITE_APP_SPOTIFY_REFRESH_TOKEN}
        />
      </div>
    </>
  );
}

export default App;
