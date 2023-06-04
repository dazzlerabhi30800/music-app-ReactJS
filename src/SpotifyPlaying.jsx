import React, { useEffect, useState } from "react";
import getNowPlayingItem from "./SpotifyAPI";

const SpotifyPlaying = ({ client_id, client_secret, refresh_token }) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState({});
  useEffect(() => {
    Promise.all([
      getNowPlayingItem(client_id, client_secret, refresh_token),
    ]).then((results) => {
      setResult(results[0]);
      setLoading(false);
    });
  });
  //   console.log(result);
  return (
    <div
      className="flex
         min-w-md w-[250px] h-80 text-white items-center mx-auto my-10 justify-center text-base border rounded-lg border-gray-dark bg-gray-dark font-GT_Flexa"
    >
      {loading ? (
        <div
          className="flex p-2
         w-fit items-center flex-col justify-center text-gray  text-base"
        >
          <img
            className="w-40 p-1 object-contain h-fit"
            src="./logo.png"
            alt="spotify"
          />
          <p className="tracking-wider px-1 text-base text-left ">Loading...</p>
        </div>
      ) : (
        <div
          className="flex p-2
         w-fit  text-base h-full items-center justify-center"
        >
          {result.isPlaying ? (
            <div className=" w-fit  h-full py-2 flex flex-col   text-left justify-around">
              <div className="w-full h-fit relative">
                <img
                  className="w-fit h-6 p-1 object-contain absolute -rotate-45 z-10"
                  src="./logo.png"
                  alt="spotify"
                />
                <img
                  className="w-fit h-fit rounded-lg"
                  src={result.albumImageUrl}
                  alt="album-image"
                />
              </div>

              <div className="flex flex-col  text-left">
                <div className="">
                  <a
                    className=" px-1  text-left underline "
                    href={result.songUrl}
                    target="_blank"
                  >
                    {result.title}
                  </a>
                </div>
                <div>
                  <p className=" px-1 text-left ">{result.artist}</p>
                </div>
              </div>
            </div>
          ) : (
            "You are offline"
          )}
        </div>
      )}
    </div>
  );
};

export default SpotifyPlaying;
