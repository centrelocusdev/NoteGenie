import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BsCheck2Circle } from "react-icons/bs";
import { getUserByToken } from "../../api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify"

const Pricing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");

  const [user, setUser] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [isFree, setIsFree] = useState("");
  const [plan, setPlan] = useState('')

  useEffect(() => {
    if (status == "completed") setIsCompleted(true);
  }, [isCompleted]);

  useEffect(() => {
    const runIt = async () => {
      const res = await getUserByToken();
      res && setUser(res);
      res && setPlan(res.subs_plan)

      if (res?.subs_plan != "free") {
        setIsFree(false);
      }
    };

    runIt();
  }, []);

  const handleClick = (plan) => {
    navigate(`/payment?plan=${plan}`);
  };

  const handleTrialClick = (e) => {
    e.preventDefault()
    if(user) {
      toast.warning('Your trial has been already started')
      navigate('/dashboard')
    } else {
      navigate('/signup')
    }
  }

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
              disabled={plan == "free"}
              onClick={handleTrialClick}
              className={`${
                plan == "free" && "cursor-not-allowed bg-[#ffebb3]"
              } py-3 px-6 bg-theme-primary font-semibold w-full md:mt-0 mt-3 hover:bg-[#ffebb3]`}
            >
              Start Trial!
            </button>
          </div>

          <div className="w-80 md:min-h-[30rem] bg-white flex flex-col gap-8 justify-between text-center">
            <div className="bg-primary-dark text-white w-full text-center py-2 uppercase">
              {plan == "basic" ? "Your current plan" : "Most Popular"}
            </div>
            <div className="font-bold uppercase text-2xl">basic</div>
            <div className="font-bold uppercase text-[4rem]">$10.99</div>
            <div className="text-gray-500 px-8 h-[6rem]">
            In this plan you get 100 Notes for $10.99. If your note taking requirement is low than subscribe to this plan.
            </div>
            <button
              disabled={(plan == "basic" || plan == "premium")}
              onClick={(e) => handleClick("basic")}
              className={`${
                (plan == "basic" || plan == "premium") && "cursor-not-allowed bg-[#ffebb3]"
              } py-3 px-6 bg-theme-primary font-semibold w-full md:mt-0 mt-3 hover:bg-[#ffebb3]`}
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
            This plan lets you create 500 Magic notes for only $14.99. Ideal for professionals in the field of Legal, Healthcare, Social workers or Therapists.
            </div>
            <button
              disabled={(plan == "basic" || plan == "premium")}
              onClick={(e) => handleClick("premium")}
              className={`${
                (plan == "basic" || plan == "premium") && "cursor-not-allowed bg-[#ffebb3]"
              } py-3 px-6 bg-theme-primary font-semibold w-full md:mt-0 mt-3 hover:bg-[#ffebb3]`}
            >
              Buy Now!
            </button>
          </div>
          {/* {plans.map((plan, key) => (
            <div className="w-80 md:min-h-[30rem] bg-white flex flex-col gap-8 justify-between text-center">
              <div className="bg-primary-dark text-white w-full text-center py-2 uppercase">
                {plan.name == user?.subs_plan ? "Your current plan" : plan.tag}
              </div>
              <div className="font-bold uppercase text-2xl">{plan.name}</div>
              <div className="font-bold uppercase text-[4rem]">
                ${plan.price}
              </div>
              <div className="text-gray-500 px-8 h-[6rem]">{plan.desc}</div>
              <button
                disabled={plan == "free" || user.subs_plan != "free"}
                onClick={(e) => handleClick(plan.price, plan.name)}
                className={`${
                  plan.name == user?.subs_plan &&
                  "cursor-not-allowed bg-[#ffebb3]"
                } py-3 px-6 bg-theme-primary font-semibold w-full md:mt-0 mt-3 hover:bg-[#ffebb3]`}
              >
                {plan.name == "free" ? "Start Trial!" : "Buy Now!"}
              </button>
            </div>
          ))} */}
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

const plans = [
  {
    tag: "Trial",
    name: "free",
    price: "0",
    desc: "Free 1 day trial to get an awesome experience about NoteGenie. You can create notes and see the magic happen.",
    url: "#",
  },
  {
    tag: "most popular",
    name: "basic",
    price: "10.99",
    desc: "In this plan you get 100 Notes for $10.99. If your note taking requirement is low than subscribe to this plan. ",
    url: "#",
  },
  {
    tag: "best value",
    name: "premium",
    price: "14.99",
    desc: "This plan lets you create 500 Magic notes for only $14.99. Ideal for professionals in the field of Legal, Healthcare, Social workers or Therapists.",
    url: "#",
  },
];

export default Pricing;
