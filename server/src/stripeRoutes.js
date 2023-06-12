const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("./userModal");

router.post("/create-customer", async (req, res) => {
  try {
    const { name, email } = req.body;
    const customer = await stripe.customers.create({ name, email });
    res.status(200).send(customer);
  } catch (err) {
    res.status(500).send({ status: "error", message: err.message });
  }
});

router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency, description, customer, payment_method } =
      req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      description,
      customer,
      payment_method,
      payment_method_types: ["card"],
    });

    const { status, client_secret, id } = paymentIntent;
    res.send({
      status: "success",
      data: {
        status,
        client_secret,
        id,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "error", message: err.message });
  }
});

router.post("/retrieve-payment-intent", async (req, res) => {
  try {
    const { clientSecret } = req.body;
    const paymentIntent = await stripe.paymentIntents.retrieve(clientSecret);

    res.send({ status: "success", data: paymentIntent });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "error", message: err.message });
  }
});

router.post("/confirm-payment", async (req, res) => {
  try {
    console.log("confirm payment called");
    const { paymentMethodId, paymentIntentId, plan, userId, subsId } = req.body;

    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
      payment_method: paymentMethodId,
    });

    console.log(paymentIntent);

    if (paymentIntent.status === "succeeded") {
      console.log("confirm payment succeeded");
      await stripe.subscriptions.update(subsId, {
        cancel_at_period_end: false,
        trial_end: "now",
      });

      const user = await User.findById(userId);
      user.subs_plan = plan;
      user.note_count = 0;
      user.trial = false;
      console.log(user);
      await user.save();
    } else if (
      paymentIntent.status === "requires_action" &&
      paymentIntent.next_action.type === "use_stripe_sdk"
    ) {
      res.status(200).send({
        requiresAction: true,
        paymentIntentClientSecret: paymentIntent.client_secret,
      });
    } else if (paymentIntent.status === "requires_confirmation") {
      await paymentIntent.confirm();
      res
        .status(200)
        .send({ status: "success", message: "payment confirmed successfully" });
    } else {
      res.status(500).send({ status: "error", message: err.message });
    }
  } catch (err) {
    res.status(500).send({ status: "error", message: err.message });
  }
});

router.post("/update-subscription", async (req, res) => {
  try {
    const { userId, subsId, plan } = req.body;
    let price;
    if (plan == "basic") price = process.env.BASIC_PRICE_ID;
    else if (plan == "premium") price = process.env.PREMIUM_PRICE_ID;
    else return;

    await stripe.subscriptions.update(subsId, {
      items: [
        {
          price,
        },
      ],
    });

    const user = await User.findById(userId);
    user.subs_plan = plan;
    user.note_count = 0;
    user.trial = false;
    await user.save();
    res.status(200).json({
      status: "success",
      message: "updated subscription successfully",
    });
  } catch (err) {
    res.status(500).send({ status: "error", message: err.message });
  }
});

router.post("/subscription", async (req, res) => {
  try {
    const { subsId } = req.body;
    const subs = await stripe.subscriptions.retrieve(subsId);
    res.status(200).send({ status: "success", data: subs });
  } catch (err) {
    res.status(500).send({ status: "error", message: err.message });
  }
});

router.post("/update-subscription-trial", async (req, res) => {
  try {
    const { subsId } = req.body;
    const subs = await stripe.subscriptions.update(subsId, {
      trial_end: "now",
    });
    res.status(200).send({ status: "success", data: subs });
  } catch (err) {
    res.status(500).send({ status: "error", message: err.message });
  }
});

module.exports = router;
