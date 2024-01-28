import React, { useState, useEffect } from "react";
import { BsGoogle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import InputPrimary from "../../components/InputPrimary";
import ButtonPrimary from "../../components/ButtonPrimary";
import { register } from "../../api";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    profession: "",
    terms: ""
  });
  const [isLoading, setIsLoading] = useState(false)
  const professions = [
    "Pharmacists",
    "Doctors",
    "Nurse",
    "Case-Manager",
    "Psychologist",
    "LCPC",
    "Clinical-Social-Worker",
    "Mental-Health-Therapist",
    "Chinese-Herbal-Medicine",
    "Acupuncture",
    "Psychiatrist",
    "Chiropractor",
    "Speech-Pathologist",
    "Occupational-Therapist",
    "Physical-therapist",
    "Emergency-Medical-Services",
    "Law-enforcement",
    "Lawyer-Paralegal",
    "Educator",
  ];

  const handleFormDataChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  

  // const handleFormDataChange = (e) => {
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.value,
  //   }));
  // };
  function isValidEmail(email) {
    let regex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    if (email == null) {
      return false;
    }
    console.log(email);
    console.log(regex.test(email));
    if (regex.test(email) == true) {
      return true;
    } else {
      return false;
    }
  }
  const handleSubmit = async (e) => {
    const checkEmail = isValidEmail(formData.email);
    if(!checkEmail){
      toast.error("Kindly add valid email!");
      return;
    }
    e.preventDefault();
    setIsLoading(true)
    const res = await register(formData);
    res && setIsLoading(false)
    res && navigate("/pricing");
  };
// useEffect(()=> {
// console.log(formData);
// }, [formData])
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
          <label
            htmlFor="profession"
            className="capitalize text-lg block font-medium mt-3 text-gray-600"
          >
            profession
          </label>
          <select
            value={formData.profession}
            name="profession"
            className="appearance-none w-full invalid:bg-gray-600 bg-[#D1D1D147] mt-1  px-6 py-3 rounded-full focus:outline-none "
          >
            <option value="">Select Your Profession</option>
            {professions.map((p) => (
              <option value={p} className="capitalize">
                {p == 'Lawyer-Paralegal' ? 'Lawyer' : p.split('-').join(' ')}
              </option>
            ))}
          </select>
          <div  className="flex items-center gap-2 mt-4">
          <input onChange={handleFormDataChange} type="checkbox" id="terms" name="terms" checked={formData.terms} required/>
          <span>
            I agree to the <span className="text-indigo-500 cursor-pointer" onClick={() => {navigate('/disclaimer')}}>NoteGenie Terms</span>
          </span>
          </div>
          <ButtonPrimary
            text={isLoading ? 'signing up...' : 'sign up'}
            width={"full"}
            handleClick={handleSubmit}
          />
          {/* <p className="text-2xl text-center text-slate-400">OR</p>
          <ButtonPrimary
            text={"contibue with google"}
            isDark={true}
            width={"full"}
            icon={<BsGoogle />}
          /> */}
        </div>
      </div>
      <div className="text-center w-full mt-5">
        <Link
          to={"/"}
          className="text-gray-500 underline hover:text-primary-dark"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default Signup;
