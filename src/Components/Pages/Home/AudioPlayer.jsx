import React, { useState, useRef, useEffect } from "react";

import { AiOutlineHeart, AiFillHeart, AiOutlinePause } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import { RxSpeakerLoud, RxSpeakerModerate, RxSpeakerOff } from "react-icons/rx";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";

const AudioPlayer = ({
  track,
  isPlaying,
  setIsPlaying,
  audioRef,
  setMusicData,
  musicData,
  setTrack,
}) => {
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(100);
  const volumeRef = useRef();
  const [totalTime, setTotalTime] = useState({
    totalSeconds: 0,
    totalMinutes: 0,
  });
  const [currentTime, setCurrentTime] = useState({
    minutes: 0,
    seconds: 0,
  });
  const [index, setIndex] = useState(0);

  // Play Music
  function handlePlay() {
    if (!isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
      setMusicData(
        musicData.map((data) => {
          if (data.songId === track.songId) {
            return { ...data, playing: true };
          } else {
            return { ...data, playing: false };
          }
        })
      );
    } else {
      audioRef.current.pause();
      setIsPlaying(false);

      setMusicData(
        musicData.map((data) => {
          if (data.songId === track.songId) {
            return { ...data, playing: false };
          } else {
            return { ...data, playing: false };
          }
        })
      );
    }
  }

  audioRef.current.addEventListener("timeupdate", () => {
    // console.log(audioRef.current.duration);
    let progressPercent =
      (audioRef.current.currentTime / audioRef.current.duration) * 100;
    progressPercent ? setProgress(parseInt(progressPercent)) : "";
    let audioPlayer = document.querySelector("#audio--progress");
    audioPlayer.style.backgroundSize = `${progressPercent}% 100%`;

    let seconds = Math.floor(audioRef.current.currentTime % 60);
    let minutes = Math.floor(audioRef.current.currentTime / 60);

    setCurrentTime({ minutes: minutes, seconds: seconds });
    if (audioRef.current.currentTime >= audioRef.current.duration) {
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
      setProgress(0);
      setIsPlaying(false);
    }
  });

  useEffect(() => {
    audioRef.current.addEventListener("loadedmetadata", checkDuration);
    setIndex(musicData.findIndex((item) => item.songId === track.songId));
    return () =>
      audioRef.current.removeEventListener("loadedmetadata", checkDuration);
  }, [track]);

  function checkDuration() {
    setTotalTime({
      totalSeconds: Math.floor(audioRef.current.duration % 60),
      totalMinutes: Math.floor(audioRef.current.duration / 60),
    });
  }

  useEffect(() => {
    let max = volumeRef.current.max;
    let min = volumeRef.current.min;
    let value = volumeRef.current.value;
    volumeRef.current.style.backgroundSize =
      ((value - min) * 100) / (max - min) + "% 100%";
    setIndex(musicData.findIndex((item) => item.songId === track.songId));
  }, []);
  // console.log(index);

  const handlePrevSong = () => {
    let prevIndex = index - 1 < 1 ? musicData.length - 1 : index - 1;
    setTrack(musicData[prevIndex]);
    audioRef.current.src = musicData[prevIndex].audioSrc;
    audioRef.current.play();
    setIsPlaying(true);
    setIndex(prevIndex);
  };
  const handleNextSong = () => {
    const nextIndex = index + 1 >= musicData.length - 1 ? 0 : index + 1;
    setTrack(musicData[nextIndex]);
    audioRef.current.src = musicData[nextIndex].audioSrc;
    audioRef.current.play();
    setIsPlaying(true);
    setIndex(nextIndex);
    // console.log(index);
  };

  useEffect(() => {
    audioRef.current.volume = volume / 100;
  }, [volume]);

  const handleInput = (e) => {
    const target = e.target;
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
          <h3>{track ? track.name : "name"}</h3>
          <p>{track ? track.artistName : "Artist"}</p>
        </div>
      </div>
      <div className="audio--controls">
        <div className="playback">
          <button onClick={handlePrevSong}>
            <BiSkipPrevious />
          </button>
          <button className="play--btn" onClick={handlePlay}>
            {isPlaying ? <AiOutlinePause /> : <BsFillPlayFill />}
          </button>
          <button onClick={handleNextSong}>
            <BiSkipNext />
          </button>
        </div>
        <div className="media--player">
          <p>
            {totalTime.totalMinutes < 10
              ? `0${totalTime.totalMinutes}`
              : totalTime.totalMinutes}
            :
            {totalTime.totalSeconds < 10
              ? `0${totalTime.totalSeconds}`
              : totalTime.totalSeconds}
          </p>
          <input
            onInput={handleInput}
            type="range"
            id="audio--progress"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => {
              setProgress(e.target.value);
              audioRef.current.currentTime =
                (audioRef.current.duration * e.target.value) / 100;
            }}
          />
          <p>
            {currentTime.minutes < 10
              ? `0${currentTime.minutes}`
              : currentTime.minutes}
            :
            {currentTime.seconds < 10
              ? `0${currentTime.seconds}`
              : currentTime.seconds}
          </p>
        </div>
      </div>
      <div className="add--controls">
        {volume < 50 ? (
          volume < 5 ? (
            <RxSpeakerOff />
          ) : (
            <RxSpeakerModerate />
          )
        ) : (
          <RxSpeakerLoud />
        )}

        <input
          onInput={handleInput}
          type="range"
          min="0"
          value={volume}
          max="100"
          ref={volumeRef}
          onChange={(e) => setVolume(e.target.value)}
          id="volume--control"
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
