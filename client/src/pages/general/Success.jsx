import React, { useEffect, useState } from "react";
import { sendCheckoutId } from "../../api";
import success from "../../assets/success.png";
import NotebookTick from "../../assets/Notebook-tick.png";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const Success = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const [loading , setLoading] = useState(false);
  const[status, setStatus] = useState("");

  const sessionId = searchParams.get("session_id");
  console.log("sessionid", sessionId);
  useEffect(() => {
    async function sendId() {
      setLoading(true);
      try {
        const res = await sendCheckoutId(sessionId);
        console.log("in the success", res);
        setLoading(false);
        setStatus("DONE");
      } catch (err) {
        console.log(err);
        setLoading(false);
        setStatus("FAILED! TRY AGAIN!")
      }
    }
    sendId();
  }, [sessionId]);
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="shadow-xl bg-white flex flex-col py-10 px-5 h-fit w-full sm:w-1/2 m-auto justify-center items-center">
        <p className="text-center font-bold text-2xl">Card Details Saved!</p>
        <div className="flex flex-col items-center gap-2">
        <p className="text-center">
        Please wait until you see the green success notification at the top of the screen.
        </p>
        {loading ? <ClipLoader color="black" size={20} /> : status === "DONE" ? <p className="text-green-800 font-bold">{status}</p> : <p className="text-red-800 font-bold">{status}</p> } 
        </div>
        
        <img className="w-86 h-60 mt-5" src={NotebookTick} alt="success" />
        
        <Link to={"/payment-method"}>
          <p className="text-gray-500 underline hover:text-primary-dark">Back</p>
        </Link>
      </div>
    </div>
  );
};

export default Success;
