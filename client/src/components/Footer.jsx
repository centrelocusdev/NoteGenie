import React from "react";
import ButtonPrimary from "../components/ButtonPrimary";
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaDiscord,
  FaTiktok
} from "react-icons/fa";
import { useNavigate } from "react-router-dom"

const Footer = () => {
  const navigate = useNavigate()
  return (
    <footer className="md:py-7 p-8 bg-theme-primary flex flex-col justify-center items-center md:justify-evenly md:text-left text-center">
      <h5 className="text-3xl">NoteGenie.ai</h5>
      <div className="flex gap-5 justify-center text-xl text-primary-dark mt-4">
          <a target="_blank" href="https://twitter.com/notegenie"><FaTwitter /></a>
          <a target="_blank" href="https://facebook.com/notegenie"><FaFacebookF /></a>
          <a target="_blank" href="https://tiktok.com/notegenie"><FaTiktok /></a>
          <a target="_blank" href="https://instagram.com/notegenie.ai"><FaInstagram /></a>
        </div>
      <ButtonPrimary text={'disclaimer'} isDark={true} handleClick={(e) => navigate('/disclaimer')} />

      <div className="border-t border-primary-light text-center pt-3">
          &copy; Copyright 2023. NoteGenie
      </div>
    </footer>
  );
};

export default Footer;
