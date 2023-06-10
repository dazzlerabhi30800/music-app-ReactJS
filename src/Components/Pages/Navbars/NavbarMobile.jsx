import React from "react";
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineHeart,
  AiFillHome,
  AiFillHeart,
} from "react-icons/ai";
import { RiSpotifyFill, RiSpotifyLine, RiSearchFill } from "react-icons/ri";
import { useLocation, Link } from "react-router-dom";

const NavbarMobile = () => {
  const location = useLocation();
  return (
    <nav className="navbar--mobile">
      <Link
        to="/"
        className={`navLink ${location.pathname === "/" ? "active" : ""}`}
      >
        {location.pathname === "/" ? <AiFillHome /> : <AiOutlineHome />}
      </Link>
      <Link
        to="/search"
        className={`navLink ${location.pathname === "/search" ? "active" : ""}`}
      >
        {location.pathname === "/search" ? (
          <RiSearchFill />
        ) : (
          <AiOutlineSearch />
        )}
      </Link>
      <Link
        to="/liked"
        className={`navLink ${location.pathname === "/liked" ? "active" : ""}`}
      >
        {location.pathname === "/liked" ? <AiFillHeart /> : <AiOutlineHeart />}
      </Link>
      <a
        href="#"
        className={`navLink ${
          location.pathname === "/subscription" ? "active" : ""
        }`}
      >
        {location.pathname === "/subscription" ? (
          <RiSpotifyFill />
        ) : (
          <RiSpotifyLine />
        )}
      </a>
    </nav>
  );
};

export default NavbarMobile;
