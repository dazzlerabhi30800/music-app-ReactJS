import React, { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import LikeSongComp from "./LikeSongComp";

const LikedSongs = ({ musicData }) => {
  const [likeData, setLikeData] = useState(
    musicData
      .filter((data) => data.favorite === true)
      .sort((a, b) => a.date - b.date)
  );
  return (
    <div className="home--wrapper">
      <div className="home--container">
        <header className="favorite--header">
          <div className="playlist likedSongs">
            <div className="playlistIcon LikeIcon">
              <AiFillHeart />
            </div>
            <div className="playlist--info">
              <p>Playlist</p>
              <h1>Liked Songs</h1>
              <h2>{likeData.length} Songs</h2>
            </div>
          </div>
        </header>
        <LikeSongComp likeData={likeData} musicData={musicData} />
      </div>
    </div>
  );
};

export default LikedSongs;
