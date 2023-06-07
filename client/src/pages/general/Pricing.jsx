import React from "react";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const navigate = useNavigate()
  return (
    <div className="py-16 md:px-0 px-8 text-center">
      <div className="md:w-4/5 m-auto flex md:flex-row flex-col justify-center items-center gap-8">
        {plans.map((plan, key) => (
          <div className="md:w-2/5 h-full bg-white flex flex-col gap-8 justify-between text-center">
            <p className="bg-primary-dark text-white w-full text-center py-2 uppercase">
              {plan.tag}
            </p>
            <p className="font-bold uppercase text-2xl">{plan.name}</p>
            <p className="font-bold uppercase text-[4rem]">${plan.price}</p>
            <p className="text-gray-500 px-8">{plan.desc}</p>
            <button
              className="py-3 px-6 bg-theme-primary font-semibold w-full md:mt-0 mt-3 hover:bg-[#ffebb3]"
            >
              Buy Now!
            </button>
          </div>
        ))}
      </div>
      <button onClick={(e) => navigate('/')} className="text-gray-500 mt-5 underline hover:text-primary-dark">Go Back</button>
    </div>
  );
};

const plans = [
  {
    tag: "zero cost",
    name: "free",
    price: "0",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, placeat dicta! Consequatur vel sequi iusto libero nostrum illo neque porro?",
    url: "#",
  },
  {
    tag: "most popular",
    name: "basic",
    price: "20",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, placeat dicta! Consequatur vel sequi iusto libero nostrum illo neque porro?",
    url: "#",
  },
  {
    tag: "best value",
    name: "premium",
    price: "50",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, placeat dicta! Consequatur vel sequi iusto libero nostrum illo neque porro?",
    url: "#",
  },
];

export default Pricing;
