import React from "react";
import { AiOutlineHome, AiOutlineSearch, AiOutlineHeart } from "react-icons/ai";
import { SlSocialSpotify } from "react-icons/sl";

const NavbarMobile = () => {
  const links = document.querySelectorAll(".navLink");
  links.forEach((link, index) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      links.forEach((link) => link.classList.remove("active"));
      links[index].classList.add("active");
    });
  });
  return (
    <nav className="navbar--mobile">
      <a href="#" className="navLink active">
        <AiOutlineHome />
      </a>
      <a href="#" className="navLink">
        <AiOutlineSearch />
      </a>
      <a href="#" className="navLink">
        <AiOutlineHeart />
      </a>
      <a href="#" className="navLink">
        <SlSocialSpotify />
      </a>
    </nav>
  );
};

export default NavbarMobile;
