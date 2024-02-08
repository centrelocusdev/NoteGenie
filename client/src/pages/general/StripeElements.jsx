import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../components/CheckoutForm.jsx";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51NEAMgHDuMBRsT9C8Pj5MhsTdvxPhPfrqHQpgqIVd13tLVRZ2eJXn07Q05fOob64n7FhZbGZ8sSsQoIA8BFYYrp400rF7hFAxX"
);

const StripeElements = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const plan = queryParams.get("plan");

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm plan={plan} />
    </Elements>
  );
};

export default StripeElements;
