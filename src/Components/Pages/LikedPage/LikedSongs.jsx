import React from "react";
import { AiFillHeart } from "react-icons/ai";
import LikeSongComp from "./LikeSongComp";

const LikedSongs = ({ musicData }) => {
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
              <h2>No of Songs</h2>
            </div>
          </div>
        </header>
        <LikeSongComp musicData={musicData} />
      </div>
    </div>
  );
};

export default LikedSongs;
