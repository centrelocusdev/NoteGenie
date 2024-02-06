import React from "react";
import error from '../../assets/error.png';
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="shadow-xl bg-white flex flex-col py-10 h-fit w-1/2 m-auto justify-center items-center">
        <p className="font-bold text-3xl mb-10">We're working on it!</p>
        <img className="w-96" src={error} alt="error"/>
        <Link to={"/payment-method"}>
          <p className="mt-10 text-gray-500 underline hover:text-primary-dark">Back</p>
        </Link>
      </div>
    </div>
  );
};

export default Error;
