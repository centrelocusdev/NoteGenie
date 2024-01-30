import React, { useEffect, useState } from "react";
import { cancelSubcription, getUserByToken } from "../api";
import { createSubscription } from "../api";
import { useNavigate } from "react-router-dom";
const UpgradeSubsPopup = ({ display , userId, plan}) => {
  const [user, setUser] = useState("");
  const navigate= useNavigate();

  useEffect(() => {
    const runIt = async () => {
      const u = await getUserByToken();
      setUser(u);
    };

    runIt();
  }, []);


  const handeUpgradeSubsClick = async (e) => {
    e.preventDefault();
    const res = await createSubscription({ userId, plan });
    res && navigate(`/payment?plan=${plan}`);
    display()
  };

  return (
    <div className="w-screen z-20 min-h-screen bg-[rgba(0,0,0,0.2)] backdrop-blur flex justify-center items-center fixed">
      <div className="md:w-1/3 rounded-2xl mx-auto bg-white p-8">
        <h4 className="text-2xl text-center">
          Are you sure you want <span className="text-red-500">cancel</span> your existing Subscription and change the plan?
        </h4> 
        <div className="flex justify-center gap-4 mt-5 text-lg">
          <button onClick={handeUpgradeSubsClick} className="bg-gray-200 px-3 py-1 rounded">Yes</button>
          <button onClick={display} className="bg-theme-primary px-3 py-1 rounded">No</button>
        </div>
      </div>
    </div>
  );
};

export default UpgradeSubsPopup;
