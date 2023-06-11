import React from "react";

const SearchList = ({
  loading,
  searchData,
  token,
  setToken,
  auth,
  handleAuthorizeSpotify,
}) => {
  const handleLogout = () => {
    setToken(null);
    console.log("hello");
    window.localStorage.removeItem("token");
  };
  return (
    <div className="result--wrapper">
      {!loading && searchData ? (
        <div className="result--container">
          {searchData.map((data, index) => {
            return (
              <div className="result--comp" key={index}>
                <div className="song--info">
                  <img src={data.album.images[2].url} alt={data.name} />
                  <div className="song--info--text">
                    <h1>{data.name}</h1>
                    <a
                      target="_blank"
                      href={data.artists[0].external_urls.spotify}
                    >
                      {data.artists[0].name}
                    </a>
                  </div>
                </div>
                <a
                  href={data.external_urls.spotify}
                  target="_blank"
                  className="listen--btn"
                >
                  Listen on Spotify
                </a>
              </div>
            );
          })}
        </div>
      ) : (
        <div
          className="auth--container"
          style={{ margin: "0 auto", textAlign: "center" }}
        >
          <h3 style={{ margin: "0 auto" }}>
            {loading ? "Loading..." : "Search Your Music"}
          </h3>
          <a className="auth--btn sign--in" href={auth}>
            {token !== null ? "You have Signed In" : "Sign In to Search Songs"}
          </a>
          {token && (
            <button className="auth--btn logout--btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchList;
