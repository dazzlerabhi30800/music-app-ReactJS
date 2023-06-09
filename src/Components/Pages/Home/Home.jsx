import React, { useState } from "react";
import RecentlyPlayed from "./RecentlyPlayed";
import MusicContainer from "./MusicContainer";

const Home = ({
  track,
  setTrack,
  setIsPlaying,
  isPlaying,
  audioRef,
  setMusicData,
  musicData,
}) => {
  return (
    <div className="home--wrapper">
      <div className="home--container">
        <RecentlyPlayed />
        <MusicContainer
          setTrack={setTrack}
          setMusicData={setMusicData}
          musicData={musicData}
          setIsPlaying={setIsPlaying}
          isPlaying={isPlaying}
          audioRef={audioRef}
        />
        {/* Made for You
    Popular and trending
    editor's pick
  best of artist */}
      </div>
    </div>
  );
};

export default Home;
