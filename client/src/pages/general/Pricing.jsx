import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BsCheck2Circle } from "react-icons/bs";
import { getUserByToken, startTrial } from "../../api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { createSubscription } from "../../api";

const Pricing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");
  const [isLoading, setIsLaoding] = useState(false)

  const [user, setUser] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [plan, setPlan] = useState("");
  const [trialState, setTrialState] = useState("Start Now");
  const [subsState, setSubsState] = useState("Start Now");
  const [subsBasicButtonStatus , setSubsBasicButtonStatus] = useState("Start Now");
  const [subsPreButtonStatus , setSubsPreButtonStatus] = useState("Start Now");


  useEffect(() => {
    if (status == "completed") setIsCompleted(true);
  }, [isCompleted]);

  useEffect(() => {
    const runIt = async () => {
      const res = await getUserByToken();
      res && setUser(res);
      res && setPlan(res.subs_plan);
    };

    runIt();
  }, []);
function checkSubStatus(user){
if(user){
  if(user.subs_started_at){
    const now = new Date();
    const subsStartedAt = new Date(user.subs_started_at);
    let diff = (now.getTime() - subsStartedAt.getTime()) / 1000;
    diff /= 60* 60;
    const hourDiffS = Math.floor(diff);
    if(hourDiffS >= 0  && hourDiffS < 744){
      setSubsState("Your Subscription Is Running")
      if(plan === 'basic'){
        setSubsBasicButtonStatus('Your Subscription Is Running');
      }
      if(plan === 'premium'){
        setSubsPreButtonStatus('Your Subscription Is Running');
      }
    }else if(hourDiffS > 744){
      setSubsState("Your Subscription Has Been Ended, Buy Now!");
      if(plan === 'basic'){
        setSubsBasicButtonStatus('Your Subscription Has Been Ended, Buy Now!');
      }
      if(plan === 'premium'){
        setSubsPreButtonStatus("Your Subscription Has Been Ended, Buy Now!");
      }
    }
  }
}
}
  useEffect(() => {
    if (user){
      console.log(user);
      console.log(trialState != 'Start Now');
      console.log(plan);
      if (user.trial_started_at) {
        const now = new Date();
        const trailStartedAt = new Date(user.trial_started_at);
        let diff = (now.getTime() - trailStartedAt.getTime()) / 1000;
        diff /= 60 * 60;
        const hourDiff = Math.floor(diff);
        if (hourDiff >= 0 && hourDiff < 24) {
          setTrialState("your trial is running");
        } else if (hourDiff > 24) {
          console.log(hourDiff);
          setTrialState("your trial has been ended");
        }
      }
     if(user.subs_started_at){
      checkSubStatus(user);
     }  
    }
  }, [user]);

  const handleClick = async (plan) => {
    setIsLaoding(true)
    if(!user) {
      toast.warning('please login to continue')
      navigate('/signup')
    }
    if(user) {
      setIsLaoding(false)
      console.log(user._id, plan);
      const res = await createSubscription({userId: user._id, plan})
      console.log(res, "in res");
      res && navigate(`/payment?plan=${plan}`);
    }
    setIsLaoding(false)
  };  

  const handleTrialClick = async (e) => {
    e.preventDefault();
    if (user) {
      const res = await startTrial(user._id);
      res && navigate("/dashboard");
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="py-16 md:px-0 px-8 text-center">
      {isCompleted ? (
        <div className="md:w-2/5 px-8 py-16 mx-auto bg-white flex flex-col items-center text-theme-primary">
          <BsCheck2Circle className="text-6xl" />
          <h3 className="text-5xl font-medium text-center">Completed!</h3>
        </div>
      ) : (
        <div className="md:w-4/5 m-auto flex justify-center items-start flex-wrap gap-8">
          <div className="w-80 md:min-h-[30rem] bg-white flex flex-col gap-8 justify-between text-center">
            <div className="bg-primary-dark text-white w-full text-center py-2 uppercase">
              {plan == "free" ? "Your current plan" : "Trial"}
            </div>
            <div className="font-bold uppercase text-2xl">Free</div>
            <div className="font-bold uppercase text-[4rem]">$0</div>
            <div className="text-gray-500 px-8 h-[6rem]">
              Free 1 day trial to get an awesome experience about NoteGenie. You
              can create notes and see the magic happen.
            </div>
            <button
              disabled={(trialState != 'Start Now') || (plan == "basic" || plan == "premium")}
              onClick={handleTrialClick}
              className={`${
                ((trialState != 'Start Now') || (plan == "basic" || plan == "premium")) &&
                "cursor-not-allowed bg-[#ffebb3]"
              } py-3 px-6 bg-theme-primary font-semibold w-full md:mt-0 mt-3 hover:bg-[#ffebb3] capitalize`}
            >
              {trialState}
            </button>
          </div>

          <div className="w-80 md:min-h-[30rem] bg-white flex flex-col gap-8 justify-between text-center">
            <div className="bg-primary-dark text-white w-full text-center py-2 uppercase">
              {plan == "basic" ? "Your current plan" : "Most Popular"}
            </div>
            <div className="font-bold uppercase text-2xl">basic</div>
            <div className="font-bold uppercase text-[4rem]">$10.99</div>
            <div className="text-gray-500 px-8 h-[6rem]">
              In this plan you get 100 Notes for $10.99. If your note taking
              requirement is low than subscribe to this plan.
            </div>
            <button
             disabled= {subsState === 'Your Subscription Is Running'}
              onClick={(e) => handleClick("basic")}
              className={`${(subsState === 'Your Subscription Is Running') && 
                "cursor-not-allowed bg-[#ffebb3]"
              } py-3 px-6 bg-theme-primary font-semibold w-full md:mt-0 mt-3 hover:bg-[#ffebb3]`}
            >
             { isLoading ? 'Loading...' : subsBasicButtonStatus}
            </button>
          </div>

          <div className="w-80 md:min-h-[30rem] bg-white flex flex-col gap-8 justify-between text-center">
            <div className="bg-primary-dark text-white w-full text-center py-2 uppercase">
              {plan == "premium" ? "Your current plan" : "Best Value"}
            </div>
            <div className="font-bold uppercase text-2xl">premium</div>
            <div className="font-bold uppercase text-[4rem]">$14.99</div>
            <div className="text-gray-500 px-8 h-[6rem]">
              This plan lets you create 500 Magic notes for only $14.99. Ideal
              for professionals in the field of Legal, Healthcare, Social
              workers or Therapists.
            </div>
            <button
              disabled={subsState === 'Your Subscription Is Running'}
              onClick={(e) => handleClick("premium")}
              className={`${
                (subsState === 'Your Subscription Is Running') &&
                "cursor-not-allowed bg-[#ffebb3]"
              } py-3 px-6 bg-theme-primary font-semibold w-full md:mt-0 mt-3 hover:bg-[#ffebb3]`}
            >
              { isLoading ? 'Loading...' : subsPreButtonStatus}
            </button>
          </div>
        </div>
      )}
      <Link
        to={isCompleted ? "/dashboard" : "/"}
        className="text-gray-500 mt-5 underline hover:text-primary-dark"
      >
        Go Back
      </Link>
    </div>
  );
};


export default Pricing;
