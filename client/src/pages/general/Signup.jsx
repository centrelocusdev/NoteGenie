import React, { useState } from "react";
import { BsGoogle } from "react-icons/bs";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import InputPrimary from "../../components/InputPrimary";
import ButtonPrimary from "../../components/ButtonPrimary";
import { register } from "../../api";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: ""
  });

  const handleFormDataChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await register(formData)
  }

  return (
    <div className="pb-16">
      <Navbar />

      <div className="md:w-2/5 md:mt-16 p-8 mx-auto rounded-2xl bg-white">
        <h3 className="text-3xl font-medium text-theme-primary text-center">
          Sign Up
        </h3>
        <p className="text-center my-4">
          Already have an account? Login{" "}
          <Link to={"/login"} className="underline">
            Now
          </Link>
        </p>

        <div onChange={handleFormDataChange} className="md:w-4/5 mx-auto">
          <InputPrimary name={"name"} placeholer={"John Doe"} />
          <InputPrimary
            type={"email"}
            name={"email"}
            placeholer={"johndoe@gmail.com"}
          />
          <InputPrimary
            type={"password"}
            name={"password"}
            placeholer={"Enter strong password"}
          />
          <InputPrimary
            type={"password"}
            name={"confirm_password"}
            placeholer={"Re-type your password"}
          />
          <ButtonPrimary text={"sign up"} width={"full"} handleClick={handleSubmit} />
          <p className="text-2xl text-center text-slate-400">OR</p>
          <ButtonPrimary
            text={"contibue with google"}
            isDark={true}
            width={"full"}
            icon={<BsGoogle />}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
