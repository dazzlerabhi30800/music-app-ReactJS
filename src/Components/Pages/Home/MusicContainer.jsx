import React, { useState, useContext } from "react";
import { AiOutlineHeart, AiFillHeart, AiOutlinePause } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";

const MusicContainer = ({ setTrack, setMusicData, musicData }) => {
  const handleFavorite = (id) => {
    setMusicData(
      musicData.map((data) => {
        if (data.songId === id) {
          return { ...data, favorite: !data.favorite };
        }
        return data;
      })
    );
  };

  const handlePlayback = (id) => {
    setMusicData(
      musicData.map((item) => {
        if (item.songId === id) {
          setTrack(item);
          return { ...item, playing: !item.playing };
        } else {
          return { ...item, playing: false };
        }
      })
    );
  };
  return (
    <div>
      <h3>Music To Play</h3>
      <div className="music--container">
        {musicData.map((audio, index) => {
          return (
            <div className="music--comp" key={index}>
              <img src={audio.img} loading="lazy" alt={audio.name} />
              <p>{audio.name}</p>
              <span
                className={`favoriteIcon ${audio.favorite ? "glow" : ""}`}
                onClick={() => handleFavorite(audio.songId)}
              >
                {audio.favorite ? <AiFillHeart /> : <AiOutlineHeart />}
              </span>
              <button
                className="play--btn"
                onClick={() => handlePlayback(audio.songId)}
              >
                {audio.playing ? <AiOutlinePause /> : <BsFillPlayFill />}
              </button>
              <a target="_blank" href={audio.spotify}>
                {audio.artistName}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MusicContainer;
