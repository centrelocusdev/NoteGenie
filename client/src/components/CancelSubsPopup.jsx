import React, { useEffect, useState } from "react";
import { cancelSubcription, getUserByToken } from "../api";

const CancelSubsPopup = ({ display }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const runIt = async () => {
      const u = await getUserByToken();
      setUser(u);
    };

    runIt();
  }, []);


  const handeCancelSubsClick = async (e) => {
    e.preventDefault();
    await cancelSubcription(user?._id)
    display()
  };

  return (
    <div className="w-screen min-h-screen bg-[rgba(0,0,0,0.2)] backdrop-blur flex justify-center items-center fixed">
      <div className="md:w-1/3 rounded-2xl mx-auto bg-white p-8">
        <h4 className="text-2xl text-center">
          Are you sure you want <span className="text-red-500">cancel</span> Your Subscription?
        </h4> 
        <div className="flex justify-center gap-4 mt-5 text-lg">
          <button onClick={handeCancelSubsClick} className="bg-gray-200 px-3 py-1 rounded">Yes</button>
          <button onClick={display} className="bg-theme-primary px-3 py-1 rounded">No</button>
        </div>
      </div>
    </div>
  );
};

export default CancelSubsPopup;
