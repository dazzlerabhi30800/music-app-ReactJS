import React, { useEffect, useContext } from "react";
import { tokenContext } from "../../../App";
import axios from "axios";
import getRecentData from "../../../SpotifyAPI";

const RecentlyPlayed = () => {
  const token = useContext(tokenContext);
  return <div>Recently Played</div>;
};

export default RecentlyPlayed;
