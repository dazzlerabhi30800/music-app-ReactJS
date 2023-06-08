import React, { useState } from "react";
import AudioControls from "./AudioControls";

import { AiOutlineHeart, AiFillHeart, AiOutlinePause } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import { RxSpeakerLoud } from "react-icons/rx";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";

const AudioPlayer = ({ track }) => {
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0);
  const audioElement = track && new Audio(track.audioSrc);
  const handleInput = (e) => {
    const target = e.target;
    //   console.log(target);
    const min = target.min;
    const max = target.max;
    const value = target.value;

    target.style.backgroundSize =
      ((value - min) * 100) / (max - min) + "% 100%";
  };
  return (
    <div className="audio--player">
      <div className="audio--info">
        {track ? (
          <img src={track.img} alt={track.name} />
        ) : (
          <div className="img--loader"></div>
        )}
        <div className="text--info">
          <h3>{track ? track.name : name}</h3>
          <p>{track ? track.artistName : Artist}</p>
        </div>
      </div>
      <div className="audio--controls">
        <div className="playback">
          <button>
            <BiSkipPrevious />
          </button>
          <button className="play--btn">
            <BsFillPlayFill />
          </button>
          <button>
            <BiSkipNext />
          </button>
        </div>
        <div className="audio--progress">
          <input
            onInput={handleInput}
            type="range"
            id="audio--progress"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
          />
        </div>
      </div>
      <div className="add--controls">
        <RxSpeakerLoud />
        <input
          onInput={handleInput}
          type="range"
          min="0"
          value={volume}
          max="100"
          onChange={(e) => setVolume(e.target.value)}
          id="volume--control"
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
