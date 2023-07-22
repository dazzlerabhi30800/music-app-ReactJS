import React, { useState } from "react";
import SearchBar from "./SearchBar";
import SearchList from "./SearchList";
import CurrentUser from "./CurrentUser";

const SearchPage = ({
  auth,
  token,
  setToken,
  handleAuthorizeSpotify,
  setCurrentUser,
  setProgress,
  currentUser,
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
        {token && (
          <CurrentUser
            currentUser={currentUser}
            setToken={setToken}
            setCurrentUser={setCurrentUser}
            token={token}
          />
        )}
        <SearchList
          token={token}
          setToken={setToken}
          loading={loading}
          auth={auth}
          searchData={searchData}
        />
      </div>
    </div>
  );
};

export default SearchPage;
