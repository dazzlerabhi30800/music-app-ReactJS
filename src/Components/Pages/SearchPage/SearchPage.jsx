import React, { useState } from "react";
import SearchBar from "./SearchBar";
import SearchList from "./SearchList";

const SearchPage = () => {
  const [searchData, setSearchData] = useState();
  const [loading, setLoading] = useState();
  return (
    <div className="home--wrapper">
      <div className="home--container">
        <SearchBar
          setLoading={setLoading}
          searchData={searchData}
          setSearchData={setSearchData}
        />
        <SearchList loading={loading} searchData={searchData} />
      </div>
    </div>
  );
};

export default SearchPage;
