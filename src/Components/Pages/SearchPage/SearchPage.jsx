import React, { useState } from "react";
import SearchBar from "./SearchBar";
import SearchList from "./SearchList";

const SearchPage = ({
  auth,
  token,
  setToken,
  handleAuthorizeSpotify,
  setProgress,
}) => {
  const [searchData, setSearchData] = useState();
  const [loading, setLoading] = useState();
  return (
    <div className="home--wrapper">
      <div className="home--container">
        <SearchBar
          setLoading={setLoading}
          searchData={searchData}
          setSearchData={setSearchData}
          token={token}
          setToken={setToken}
          setProgress={setProgress}
        />
        <SearchList
          token={token}
          setToken={setToken}
          handleAuthorizeSpotify={handleAuthorizeSpotify}
          loading={loading}
          auth={auth}
          searchData={searchData}
        />
      </div>
    </div>
  );
};

export default SearchPage;
