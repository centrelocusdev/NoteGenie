import React from "react";
import ButtonPrimary from "../components/ButtonPrimary";
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaDiscord
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="md:p-16 p-8 bg-theme-primary flex md:flex-row flex-col gap-5 justify-center items-start md:justify-evenly md:text-left text-center">
      <div className="md:w-1/5">
        <h5 className="text-primary-dark text-xl mb-3 font-semibold">Newsletter</h5>
        <div className="">
          <input
            type="text"
            placeholder="Enter your email"
            className="h-fit focus:outline-none rounded-full px-4 py-2 w-full"
          />
          <button className="w-full bg-primary-dark text-white hover:bg-slate-800 rounded-full px-6 py-2 my-2">Subscribe</button>
        </div>

        <div className="flex gap-3 md:justify-between justify-center text-xl text-primary-dark mt-3">
          <FaTwitter />
          <FaFacebookF />
          <FaDiscord />
          <FaInstagram />
          <FaLinkedinIn />
        </div>
      </div>
      <div className="md:w-fit">
        <h5 className="text-primary-dark text-xl font-semibold mb-3">Useful Links</h5>
        <ul className="list-none flex flex-col gap-2">
          <li className="hover:underline cursor-pointer">Privacy Policy</li>
          <li className="hover:underline cursor-pointer">Terms and Conditions</li>
          <li className="hover:underline cursor-pointer">Support</li>
        </ul>
      </div>
      <div className="md:w-1/3">
      <h5 className="text-primary-dark text-xl mb-3 font-semibold">Disclaimer</h5>
      <p className="">
      The information provided on this website and through our app is for educational and informational purposes only. It should not be considered as medical or professional advice. Always consult with a qualified professional before making any decisions based on information obtained from this app or website.
      </p>
      </div>
    </footer>
  );
};

export default Footer;
