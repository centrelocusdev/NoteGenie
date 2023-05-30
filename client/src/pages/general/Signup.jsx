import React, { useState } from "react";
import { BsGoogle } from "react-icons/bs";
import Navbar from "../../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import InputPrimary from "../../components/InputPrimary";
import ButtonPrimary from "../../components/ButtonPrimary";
import { register } from "../../api";

const Signup = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    profession: ""
  });
  const professions = ['healthcare provider', 'social worker', 'acupuncuturist', 'educator', 'psychologist', 'mental health therapist', 'chinese herbal medicine', 'psychiatrist', 'doctor', 'physical therapist', 'occupational therapist', 'chiropractor', 'speech pathologist', 'law inforcement', 'lawyer']

  const handleFormDataChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await register(formData)
    res && navigate('/dashboard')
  }

  return (
    <div className="py-16">
      <div className="md:w-2/5 p-8 mx-auto rounded-2xl bg-white">
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
          <InputPrimary name={"name"} placeholder={"John Doe"} />
          <InputPrimary
            type={"email"}
            name={"email"}
            placeholder={"johndoe@gmail.com"}
          />
          <InputPrimary
            type={"password"}
            name={"password"}
            placeholder={"Enter strong password"}
          />
          <InputPrimary
            type={"password"}
            name={"confirm_password"}
            placeholder={"Re-type your password"}
          />
          <select value={formData.profession} name="profession" className="appearance-none w-full invalid:bg-gray-600 bg-[#D1D1D147] mt-5 px-6 py-3 rounded-full focus:outline-none ">
            <option value="">Select Your Profession</option>
            {professions.map(p => (
              <option value={p} className="capitalize">{p}</option>
            ))}
          </select>
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
