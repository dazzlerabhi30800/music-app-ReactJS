import axios from "axios";
export default async function searchArtists(searchKey, token) {
  const { data } = await axios.get("https://api.spotify.com/v1/search", {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_APP_ACCESS_TOKEN_2}`,
    },
    params: {
      q: searchKey,
      limit: 5,
      offset: 1,
      // type: "artist",
      type: "track,artist",
    },
  });
  // console.log(data);
  return data;
}
