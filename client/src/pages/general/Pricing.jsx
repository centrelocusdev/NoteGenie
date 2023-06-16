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

  const [user, setUser] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [plan, setPlan] = useState("");
  const [trialState, setTrialState] = useState("start now");

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

  useEffect(() => {
    if (user)
      if (user.trial) {
        const now = new Date();
        const trailStartedAt = new Date(user.trial_started_at);
        let diff = (now.getTime() - trailStartedAt.getTime()) / 1000;
        diff /= 60 * 60;
        const hourDiff = Math.floor(diff);
        if (hourDiff >= 0 && hourDiff < 24) {
          setTrialState("your trail is running");
        } else if (hourDiff > 24) {
          setTrialState("your trail has been ended");
        }
      }
  }, [user]);

  const handleClick = async (plan) => {
    if(!user) {
      toast.warning('please login to continue')
      navigate('/signup')
    }
    if(user) {
      const res = await createSubscription({userId: user._id, plan})
      console.log(res)
      res && navigate(`/payment?plan=${plan}`);
    }
    
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
              disabled={(trialState != 'start now') || (plan == "basic" || plan == "premium")}
              onClick={handleTrialClick}
              className={`${
                ((trialState != 'start now') || (plan == "basic" || plan == "premium")) &&
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
              // disabled={plan == "basic" || plan == "premium"}
              onClick={(e) => handleClick("basic")}
              className={` py-3 px-6 bg-theme-primary font-semibold w-full md:mt-0 mt-3 hover:bg-[#ffebb3]`}
            >
              Buy Now!
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
              disabled={plan == "basic" || plan == "premium"}
              onClick={(e) => handleClick("premium")}
              className={`${
                (plan == "basic" || plan == "premium") &&
                "cursor-not-allowed bg-[#ffebb3]"
              } py-3 px-6 bg-theme-primary font-semibold w-full md:mt-0 mt-3 hover:bg-[#ffebb3]`}
            >
              Buy Now!
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
