import React, { useState, useEffect } from "react";
import "../styles/Hero.css";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import pandaNtfs from '../assets/panda-ntfs.png';

const Hero = () => {
  let navigate = useNavigate();

  const goExplore = () => {
    navigate("/explore");
  };
  const goCreate = () => {
    navigate("/create");
  };

  return (
    <div id="hero">
      {/* <img id='hero-background' src={list[0].src}/> */}

      <Header />

      {/* <h1 id="header-text-first"> NFT </h1> */}
      <h1 id="header-text-second">
        <img class="logo-panda" src={pandaNtfs}></img>
      </h1>
      <h5 id="header-subtext">Hunt and Trade NFTs</h5>

      <div id="hero-buttons">
        <button id="explore" onClick={goExplore}>
          Explore
        </button>
        <button id="create" onClick={goCreate}>Create</button>
      </div>
    </div>
  );
};

export default Hero;
