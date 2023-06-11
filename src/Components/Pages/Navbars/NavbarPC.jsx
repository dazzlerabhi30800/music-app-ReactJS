import React, { useState } from "react";
import searchArtists from "../../../FetchArtists";
import { BiLibrary } from "react-icons/bi";
import { FaItunesNote } from "react-icons/fa";
import {
  AiOutlineHome,
  AiFillHome,
  AiOutlineSearch,
  AiFillPushpin,
  AiFillHeart,
} from "react-icons/ai";
import { RiSearchFill } from "react-icons/ri";
import artistData from "../../Data/NavbarArtistData.json";
import { Link, useLocation } from "react-router-dom";

const NavbarPC = () => {
  const location = useLocation();
  const [artist, setArtist] = useState(artistData.data);
  return (
    <nav className="navbar--pc">
      <div className="header--pc">
        <Link to="/" className={`${location.pathname === "/" ? "active" : ""}`}>
          {location.pathname === "/" ? <AiFillHome /> : <AiOutlineHome />}
          <span>Home</span>
        </Link>
        <Link
          to="/search"
          className={`${location.pathname === "/search" ? "active" : ""}`}
        >
          {location.pathname === "/search" ? (
            <RiSearchFill />
          ) : (
            <AiOutlineSearch />
          )}
          <span>Search</span>
        </Link>
      </div>
      <div className="library--wrapper">
        <div className="libraryIcon">
          <p>
            <BiLibrary className="icons" />
          </p>
          <div>Library</div>
        </div>
        <div className="playlist--wrapper">
          <Link
            to="/liked"
            className={`${location.pathname === "/liked" ? "active" : ""}`}
          >
            <div className="playlist likedSongs">
              <div className="playlistIcon LikeIcon">
                <AiFillHeart />
              </div>
              <div className="playlist--info">
                <h2>Liked Songs</h2>
                <p>
                  <AiFillPushpin /> Playlist.<span>No of songs</span>
                </p>
              </div>
            </div>
          </Link>
          <div className="playlist playlistSongs">
            <div className="playlistIcon tuneIcon">
              <FaItunesNote />
            </div>
            <div className="playlist--info">
              <h2>Playlist #1</h2>
              <p>
                Playlist . <span> DAZZLER</span>
              </p>
            </div>
          </div>
          <div className="playlist playlistSongs">
            <div className="playlistIcon tuneIcon">
              <FaItunesNote />
            </div>
            <div className="playlist--info">
              <h2>Playlist #2</h2>
              <p>
                Playlist . <span> DAZZLER</span>
              </p>
            </div>
          </div>
          <div className="playlist playlistSongs">
            <div className="playlistIcon tuneIcon">
              <FaItunesNote />
            </div>
            <div className="playlist--info">
              <h2>Playlist #3</h2>
              <p>
                Playlist . <span> DAZZLER</span>
              </p>
            </div>
          </div>
          {artist.map((item, index) => {
            return (
              <a target="_blank" href={item.spotify} key={index}>
                <div className="artist">
                  <img src={item.img} alt={item.name} />
                  <h3>{item.name}</h3>
                  <p>{item.type}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default NavbarPC;
