import queryString from "query-string";

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

// const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me`;
const RECENT_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`;

const client_id = import.meta.env.VITE_APP_SPOTIFY_CLIENT_ID;
const client_secret = import.meta.env.VITE_APP_SPOTIFY_CLIENT_SECRET;
const refresh_token = import.meta.env.VITE_APP_SPOTIFY_REFRESH_TOKEN;

const getAccessToken = async () => {
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: queryString.stringify({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });
  return response.json();
};

export const getNowPlaying = async (
  client_id,
  client_secret,
  refresh_token,
  endPoint
) => {
  const { access_token } = await getAccessToken(
    client_id,
    client_secret,
    refresh_token
  );
  return fetch(endPoint, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export default async function getRecentData(
  client_id,
  client_secret,
  refresh_token,
  endPoint
) {
  const response = await getNowPlaying(
    client_id,
    client_secret,
    refresh_token,
    endPoint
  );
  if (response.status === 204 || response.status > 400) {
    return false;
  }
  console.log(response);

  const data = await response.json();
  return data;
}

// export default async function getNowRecentTracks(
//   client_id,
//   client_secret,
//   refresh_token
// ) {
//   const response = await getNowPlaying(
//     client_id,
//     client_secret,
//     refresh_token,
//     RECENT_ENDPOINT
//   );
//   if (response.status === 204 || response.status > 400) {
//     return false;
//   }

//   const data = await response.json();
//   return data;
// }
