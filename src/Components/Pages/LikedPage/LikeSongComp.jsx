import React from "react";
import { AiFillHeart } from "react-icons/ai";
import useResize from "../../../useResize";

const LikeSongComp = ({ musicData, likeData }) => {
  const windowSize = useResize();

  return (
    <div className="like-song-wrapper">
      {likeData &&
        likeData.map((item, index) => {
          return (
            <div className="like-song-comp" key={index}>
              <div className="index--comp">
                {windowSize > 700 && <h3>{index + 1}.</h3>}
                <div className="info--wrapper">
                  <img src={item.img} alt="" />
                  <div className="info">
                    <h4>{item.name}</h4>
                    <p>{item.artistName}</p>
                  </div>
                </div>
              </div>
              <button className="favoriteIcon">
                <AiFillHeart />
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default LikeSongComp;
