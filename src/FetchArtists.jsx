import axios from "axios";
export default async function searchArtists(searchKey, token) {
  const { data } = await axios.get("https://api.spotify.com/v1/search", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      q: searchKey,
      limit: 5,
      offset: 1,
      // type: "artist",
      type: "track",
    },
  });
  // console.log(data);
  return data;
}
