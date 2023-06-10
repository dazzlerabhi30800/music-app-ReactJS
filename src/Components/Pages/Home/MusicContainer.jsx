import React from "react";
import { AiOutlineHeart, AiFillHeart, AiOutlinePause } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import useResize from "../../../useResize";

const MusicContainer = ({
  setTrack,
  setMusicData,
  musicData,
  setIsPlaying,
  isExpand,
  isPlaying,
  audioRef,
}) => {
  const handleFavorite = (id) => {
    setMusicData(
      musicData.map((data) => {
        if (data.songId === id) {
          if (!data.favorite) {
            return { ...data, favorite: true, date: Date.now() };
          } else {
            return { ...data, favorite: false, date: null };
          }
        }
        return data;
      })
    );
  };
  const windowSize = useResize();

  const handlePlayback = (id) => {
    setMusicData(
      musicData.map((item) => {
        if (item.songId === id) {
          audioRef.current.currentTime = 0;
          audioRef.current.src = item.audioSrc;
          setTrack(item);
          if (!item.playing) {
            audioRef.current.play();
            setIsPlaying(true);
            return { ...item, playing: true };
          } else {
            audioRef.current.pause();
            setIsPlaying(false);
            return { ...item, playing: false };
          }
        } else {
          return { ...item, playing: false };
        }
      })
    );
  };
  return (
    <div className={`${windowSize < 700 && isExpand ? "hide" : ""}`}>
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
