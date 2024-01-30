import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../components/CheckoutForm.jsx";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51OQ4ukDFLLIouIYzxocAl4yRG9GsDP2ht0bfjMO3Naeh2IBugDVeBFgcaFrwRkru4XA8BeUHX4ocl8ZOVxU2x5jy00PA7TTm53"
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
