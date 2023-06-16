import queryString from "query-string";
import axios from "axios";

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

// const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me`;
const RECENT_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`;
const SEARCH_ENDPOINT = `https://api.spotify.com/v1/search`;

export default async function getRecentData(searchKey, token) {
  const { data } = await axios.get("https://api.spotify.com/v1/search", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      q: searchKey,
      limit: 30,
      // type: "artist",
      type: "track,artist,album",
    },
  });
  return data;
}
