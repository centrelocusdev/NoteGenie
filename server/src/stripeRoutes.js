const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/create-customer", async (req, res) => {
  try {
    const { name, email } = req.body;
    const customer = await stripe.customers.create({ name, email });
    res.status(200).send(customer);
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency, description, customer, payment_method } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      description,
      customer,
      payment_method,
      payment_method_types: ['card']
    });

    res.send(paymentIntent);
  } catch (err) { 
    console.log(err);
    res.status(400).send({ err: err.message });
  }
});

router.post("/retrieve-payment-intent", async (req, res) => {
  try {
    const { clientSecret } = req.body;
    const paymentIntent = await stripe.paymentIntents.retrieve(clientSecret);

    res.send(paymentIntent);
  } catch (err) {
    console.log(err);
    res.status(400).send({ err: err.message });
  }
});

router.post("/confirm-payment", async (req, res) => {
  try {
    const { paymentMethodId, paymentIntentId, return_url } = req.body;

    console.log(paymentMethodId, paymentIntentId);
    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
      payment_method: paymentMethodId,
      return_url
    });

    console.log(paymentIntent.status);
    if (paymentIntent.status === "succeeded") {
      res.status(200).json({ success: true });
    } else if (
      paymentIntent.status === "requires_action" &&
      paymentIntent.next_action.type === "use_stripe_sdk"
    ) {
      res.status(200).json({
        requiresAction: true,
        paymentIntentClientSecret: paymentIntent.client_secret,
      });
    } else if (paymentIntent.status === "requires_confirmation") {
      await paymentIntent.confirm(); // Confirm the payment intent
      res.status(200).json({ requiresConfirmation: true });
    } else {
      res.status(400).json({ success: false });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ err: err.message });
  }
});

router.post("/create-subscription", async (req, res) => {
  try {
    const { customer } = req.body;
    const subs = await stripe.subscriptions.create({
      customer,
      cancel_at_period_end: true,
    });
    res.status(200).json(subs);
  } catch (err) {
    console.error(err);
    res.status(500).send({ err: err.message });
  }
});

module.exports = router;
