import React, { useState } from "react";
import data from "../../Data/ArtistData.json";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const MusicContainer = () => {
  const [musicData, setMusicData] = useState(data.audiPlayerData);
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
