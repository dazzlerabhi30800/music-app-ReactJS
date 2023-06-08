import React from "react";
import RecentlyPlayed from "./RecentlyPlayed";
import MusicContainer from "./MusicContainer";

const Home = () => {
  return (
    <div className="home--wrapper">
      <div className="home--container">
        <RecentlyPlayed />
        <MusicContainer />
        {/* Made for You
    Popular and trending
    editor's pick
  best of artist */}
      </div>
    </div>
  );
};

export default Home;
