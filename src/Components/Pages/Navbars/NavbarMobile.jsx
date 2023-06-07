import React from "react";
import { AiOutlineHome, AiOutlineSearch, AiOutlineHeart } from "react-icons/ai";
import { SlSocialSpotify } from "react-icons/sl";

const NavbarMobile = () => {
  const links = document.querySelectorAll("a");
  links.forEach((link, index) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      links.forEach((link) => link.classList.remove("active"));
      links[index].classList.add("active");
    });
  });
  return (
    <nav className="navbar--mobile">
      <a href="#" className="active">
        <AiOutlineHome />
      </a>
      <a href="#">
        <AiOutlineSearch />
      </a>
      <a href="#">
        <AiOutlineHeart />
      </a>
      <a href="#">
        <SlSocialSpotify />
      </a>
    </nav>
  );
};

export default NavbarMobile;
