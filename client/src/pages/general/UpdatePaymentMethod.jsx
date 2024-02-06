import React, { useEffect, useState } from "react";
import { createCheckoutSession } from "../../api";
import { toast } from "react-toastify";
import { updateCardDetails } from "../../api";
import { fetchCardDetails } from "../../api";
import notebook from "../../assets/Notebook.png";
import ClipLoader from "react-spinners/ClipLoader";
import { BsArrowLeftCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const UpdatePaymentMethod = () => {
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    exp_month: null,
    exp_year: null,
  });
  const [error, setError] = useState({
    exp_month: null,
    exp_year: null,
  });
  const [card, setCard] = useState({});

  async function handleCreateCheckout() {
    try {
      const res = await createCheckoutSession();
      if (res.status === "success") {
        if (res.session && res.session.url) {
          console.log(res.session);
          window.location.href = res.session.url;
        }
      }
      console.log("create chcekout session", res);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "exp_month" && (value > 0 || value <= 12)) {
      setError((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
    if (name === "exp_month" && (value <= 0 || value > 12)) {
      setError((prev) => ({
        ...prev,
        [name]: "Invalid Month",
      }));
    }
    if (name === "exp_year" && value >= new Date().getFullYear()) {
      setError((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
    if (name === "exp_year" && value < new Date().getFullYear()) {
      setError((prev) => ({
        ...prev,
        [name]: "Invalid Year",
      }));
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  async function handleSubmit() {
    setLoadingUpdate(true);
    try {
      console.log(formData);
      if (error.exp_month != null || error.exp_year != null) {
        toast.error("Invalid Fields");
        setLoadingUpdate(false);
        return;
      }
      if(formData.exp_month === null){
        setError((prev) => ({
          ...prev,
          ["exp_month"]: "Invalid Month",
        }));
        setLoadingUpdate(false);
      }

      if(formData.exp_year === null){
        setError((prev) => ({
          ...prev,
          ["exp_year"]: "Invalid Year",
        }));
        setLoadingUpdate(false);
        return;
      }
      console.log("formdata", formData);
      const res = await updateCardDetails(formData);
      if (res === true) {
        setLoadingUpdate(false);
        formData({
          exp_month: "",
          exp_year: "",
        });
      }
    } catch (err) {
      console.log(err);
      setLoadingUpdate(false);
    }
  }
  useEffect(() => {
    async function getCardDetails() {
      try {
        const res = await fetchCardDetails();
        console.log("card", res);
        if (res.status === "success") {
          setCard(res.card);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getCardDetails();
  }, []);

  return (
    <div className="w-screen min-h-screen h-fit flex justify-center items-center">
      <div className="w-screen min-h-screen h-fit flex justify-center items-center">
        <div className="w-full sm:w-2/3 h-fit flex py-10 flex-col lg:flex-row  m-auto items-center gap-10 px-10 bg-primary-light  sm:bg-white">
          <div className="w-full sm:w-1/2 h-full flex gap-2 justify-end">
          
            <img className="w-full h-full" src={notebook} alt="notebook" />
          </div>
          <div className="flex w-full lg:w-1/2 h-fit flex-col">
            <div className="flex gap-5 items-center mb-5">
            <BsArrowLeftCircle className="cursor-pointer" onClick={()=> {navigate("/pricing")}} size={30} />
            <h1 className="font-bold text-3xl">Update Card Details</h1>
            </div>
            <div className="flex flex-col items-start gap-2 mb-5">
              <label className="text-sm" htmlFor="card-number">
                Current Card Number
              </label>
              <input
                disabled
                className="border border-solid border-gray w-full py-2 px-3 rounded-md"
                name="card-number"
                type="text"
                placeholder="**** **** **** **** 1234"
                value={
                  card.last4
                    ? `**** **** **** ${card.last4}`
                    : `**** **** **** ****`
                }
              />
            </div>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex flex-col items-start gap-2">
                <label className="text-sm" htmlFor="exp_month">
                  Expiration Month
                </label>
                <input
                  disabled
                  value={card.exp_month}
                  className="border border-solid border-gray w-full py-2 px-3 rounded-md"
                  name="exp_month"
                  type="number"
                  placeholder="mm"
                />
              </div>
              <div className="flex flex-col items-start gap-2">
                <label className="text-sm" htmlFor="exp_year">
                  Expiration Year
                </label>
                <input
                  disabled
                  value={card.exp_year}
                  className="border border-solid border-gray w-full py-2 px-3 rounded-md"
                  name="exp_year"
                  type="number"
                  placeholder="yyyy"
                />
              </div>
            </div>
            <p className="text-lg font-semibold mt-8 text-start">
              Enter your new details
            </p>
            <div className="flex gap-4 flex-col lg:flex-row">
              <div className="flex flex-col items-start gap-2">
                <label className="text-sm" htmlFor="exp_month">
                  Expiration Month
                </label>
                <input
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  value={formData.exp_month}
                  className="border border-solid border-gray w-full py-2 px-3 rounded-md"
                  name="exp_month"
                  type="number"
                  placeholder="mm"
                />
                <p className="text-base text-red-900">
                  {error && error.exp_month}
                </p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <label className="text-sm" htmlFor="exp_year">
                  Expiration Year
                </label>
                <input
                  value={formData.exp_year}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  className="border border-solid border-gray w-full py-2 px-3 rounded-md"
                  name="exp_year"
                  type="number"
                  placeholder="yyyy"
                />
                <p className="text-base text-red-900">
                  {error && error.exp_year}
                </p>
              </div>
            </div>
            <div className="w-full flex flex-col xl:flex-row gap-4 mt-5">
              <button
                onClick={handleSubmit}
                className="px-5 w-full xl:w-1/3 rounded-full bg-black text-white font-bold py-2"
              >
                {loadingUpdate ?
                 <div className="flex justify-center items-center gap-2"><span>Updating...</span> <ClipLoader color="white" size={20} /></div>
                  :
                  "Update"}
              </button>
              <button
                onClick={() => {
                  handleCreateCheckout();
                }}
                className="px-5 py-2 w-full xl:w-2/3 rounded-full border border-solid border-black bg-gray-100 font-bold"
              >
                Add new payment method
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePaymentMethod;
