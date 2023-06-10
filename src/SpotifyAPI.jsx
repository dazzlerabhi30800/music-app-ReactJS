import queryString from "query-string";
import axios from "axios";

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

// const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me`;
const RECENT_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`;
const SEARCH_ENDPOINT = `https://api.spotify.com/v1/search`;

const client_id = import.meta.env.VITE_APP_SPOTIFY_CLIENT_ID;
const client_secret = import.meta.env.VITE_APP_SPOTIFY_CLIENT_SECRET;
const refresh_token = import.meta.env.VITE_APP_SPOTIFY_REFRESH_TOKEN;

// const getAccessToken = async () => {
//   const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
//   const response = await fetch(TOKEN_ENDPOINT, {
//     method: "POST",
//     headers: {
//       Authorization: `Basic ${basic}`,
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: queryString.stringify({
//       grant_type: "refresh_token",
//       refresh_token,
//     }),
//     json: true,
//   });
//   return response.json();
// };

const getAccessToken = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  // Make a POST request to exchange the authorization code for an access token
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: import.meta.env.VITE_APP_SECRET_CODE,
      redirect_uri: "http://localhost:5173/",
      client_id: import.meta.env.VITE_APP_SPOTIFY_CLIENT_ID,
      client_secret: import.meta.env.VITE_APP_SPOTIFY_CLIENT_SECRET,
    }),
  });
  return response.json();
};

export const getNowPlaying = async () => {
  // const { access_token } = await getAccessToken();
  const access_token = await getAccessToken();
  console.log(access_token);
  return access_token;
};

export default async function getRecentData(searchKey, token) {
  const { data } = await axios.get("https://api.spotify.com/v1/search", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      q: searchKey,
      limit: 20,
      // type: "artist",
      type: "track,artist,album",
    },
  });
  return data;
}
