import React, { useState, useEffect } from "react";
import { BsGoogle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import InputPrimary from "../../components/InputPrimary";
import ButtonPrimary from "../../components/ButtonPrimary";
import { register , getOtp , verifyOtp } from "../../api";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

const Signup = () => {
  const navigate = useNavigate();
  const[phase1, setPhase1] = useState(false);
  const[phase2, setPhase2] = useState(false);
  const[phase3, setPhase3] = useState(false);
  const [phase1Loader, setPhase1Loader] = useState(false);
  const [phase2Loader, setPhase2Loader] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    profession: "",
    terms: "",
    otp: ""
  });
  const [isLoading, setIsLoading] = useState(false)
  const professions = [
    "Acupuncture",
    "Case-Manager",
    "Chinese-Herbal-Medicine",
    "Chiropractor",
    "Clinical-Social-Worker",
    "Doctors",
    "Educator",
    "Emergency-Medical-Services",
    "Law-enforcement",
    "Lawyer-Paralegal",
    "LCPC",
    "Mental-Health-Therapist",
    "Nurse",
    "Occupational-Therapist",
    "Pharmacists",
    "Physical-therapist",
    "Psychiatrist",
    "Psychologist",
    "Speech-Pathologist",    
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
    // console.log(email);
    // console.log(regex.test(email));
    if (regex.test(email) == true) {
      return true;
    } else {
      return false;
    }
  }
  const sendRequestForOtp = async () => {
    setPhase1Loader(true);
    try{
      const checkEmail = isValidEmail(formData.email);
      if(!checkEmail){
        toast.error("Kindly add valid email!");
        setPhase1Loader(false);
        return;
      }
      const res = await getOtp(formData.email);
      if(res){
        setPhase1(true);
        setPhase1Loader(false);
      }else{
        setPhase1Loader(false);
        // toast.error("Invalid Email!");
      }

    }catch(err){
      console.log(err);
      setPhase1Loader(false);
      // toast.error("Something went wrong!");
    }
  }

  const verifytheOtp = async () => {
    if(!formData.email){
      toast.error("Email is required!");
      return;
    }
    if(!formData.otp){
      toast.error("OTP is required!");
      return;
    }
    setPhase2Loader(true);
    try{
      const res = await verifyOtp({email:formData.email, otp:formData.otp});
      if(res){
        setPhase2(true);
        setFormData((prevState) => ({
          ...prevState,
          ["otp"]: "",
        }));
        setPhase2Loader(false);
      }else{
        setPhase2Loader(false);
      }

    }catch(err){
      console.log(err);
      setPhase2Loader(false);
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try{
      const checkEmail = isValidEmail(formData.email);
    if(!checkEmail){
      toast.error("Kindly add valid email!");
      setIsLoading(false);
      return;
    }
    
    const res = await register(formData);
    setIsLoading(false);
    res && navigate("/pricing");

    }catch(err){
      console.log(err);
      setIsLoading(false);
    }
    
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
          
          <div className="flex items-end gap-2">
          <InputPrimary
            type={"email"}
            name={"email"}
            placeholder={"johndoe@gmail.com"}
          />
          <button disabled={phase1} onClick={sendRequestForOtp} className={`${phase1 === true ? "cursor-not-allowed focus:outline-none disabled:opacity-75": "cursor-pointer"} w-1/2 px-2 py-2  bg-theme-primary rounded-full`}>{phase1Loader? <ClipLoader color="black" size={20} /> : "Get OTP" }</button>
          </div>
          {(phase1 === true && phase2 === false) && 
          <div className="flex items-end gap-2">
          <InputPrimary
            type={"otp"}
            name={"otp"}
            placeholder={"*****"}
          />
          <button onClick={verifytheOtp} className="w-1/2 px-2 py-2 cursor-pointer bg-theme-primary rounded-full">{phase2Loader ? <ClipLoader color="black" size={20} /> : "Verify OTP"}</button>
          </div>
          }
          <InputPrimary name={"name"} placeholder={"John Doe"} />

         
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
          isDisabled={(!phase1 || !phase2) && true}
          
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
