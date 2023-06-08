import React, { useEffect, useContext } from "react";
// import { tokenContext } from "../../../App";
import data from "../../Data/ArtistData.json";

const RecentlyPlayed = () => {
  let recent = data.recentData;
  // const token = useContext(tokenContext);
  return (
    <div className="recent--wrapper">
      <h3>Recently Played</h3>
      <div className="recent--container">
        {recent.map((data, index) => {
          return (
            <a target="_blank" href={data.spotify} key={index}>
              <div className="recent--comp">
                <img src={data.img} alt={data.name} />
                <p>{data.name}</p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default RecentlyPlayed;
