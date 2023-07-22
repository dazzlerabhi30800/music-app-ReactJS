import React from "react";

const CurrentUser = ({ token, setToken, currentUser, setCurrentUser }) => {
  console.log(currentUser);

  const handleLogout = () => {
    setToken(null);
    setCurrentUser(null);
    window.localStorage.removeItem("token");
  };

  console.log(token);
  return (
    <div className="current--user">
      {token && (
        <button className="auth--btn logout--btn" onClick={handleLogout}>
          Logout
        </button>
      )}
      {currentUser !== null && (
        <div className="current--user--info">
          <span>{currentUser.display_name}</span>
          <img src={currentUser.images[0].url} alt="" />
        </div>
      )}
    </div>
  );
};

export default CurrentUser;
