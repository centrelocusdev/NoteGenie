const router = require("express").Router();
const User = require("./userModal");
const bcrypt = require("bcrypt");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY_TEST);
const moment = require("moment");

const createPrice = async () => {
  try {
    const plan = 'Premium'
    const product = await stripe.products.create({
      name: `NoteGenie ${plan}`,
    });

    if (product) {
      const price = await stripe.prices.create({
        unit_amount: (14.99 * 100),
        currency: "usd",
        product: product.id,
        recurring: { interval: "month" },
      });
      console.log(price.id, price.product);
    }
  } catch (err) {
    console.log(err);
  }
};

// createPrice()

//get user by token
router.get("/user/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const user = await User.findOne({ token });
    res.status(200).send({status: 'success', data: user});
  } catch (err) {
    res.status(400).send({status: 'error', message: err.message });
  }
});

//signup
router.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.generateAuthToken();

    const customer = await stripe.customers.create({
      name: user.name,
      email: user.email,
    });
    user.customer_id = customer.id;

    const trialEnd = Math.floor(Date.now() / 1000) + 24 * 60 * 60;

    const subs = await stripe.subscriptions.create({
      customer: customer.id,
      trial_end: trialEnd,
      cancel_at_period_end: true,
      items: [
        {
          price: process.env.FREE_PRICE_ID_TEST,
        },
      ],
    });
    user.subs_id = subs.id;

    if (!subs || !customer) {
      throw new Error("something went wrong");
    }

    await user.save();

    res.status(200).send({ status: "success", data: user });
  } catch (err) {
    res.status(400).send({ status: "error", message: err.message });
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found, please try again");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Incorrect password, please try again");
    else {
      await user.generateAuthToken();

      res.status(200).send({ status: "success", data: user});
    }
  } catch (err) {
    res.status(400).send({ status: "error", message: err.message });
  }
});

//update
router.post("/update-profile", async (req, res) => {
  try {
    const { id } = req.query;
    const user = await User.findOne({ id });
    if (!user) throw new Error("user not found");

    const fieldsToBeUpdated = ["password", "profession"];
    const fields = Object.keys(req.body);

    fieldsToBeUpdated.map((f, i) => {
      if (fields.includes(fieldsToBeUpdated[i])) {
        user[f] = req.body[f];
      }
    });
    await user.save();
    res.send({status: 'success', message: 'profile updated successfully'});
  } catch (err) {
    res.status(400).send({status: 'error', message: err.message });
  }
});

//logout
router.post("/logout", async (req, res) => {
  try {
    const user = req.user;
    user.tokens = user.tokens.filter((token) => token != req.token);
    await user.save();
    res.send({status: 'success', message: 'logged out!'});
  } catch (err) {
    res.status(400).send({status: 'error', message: err.message });
  }
});

//delete account permenenty
router.post("/delete-account", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    res.send({ msg: "Account deleted successfully" });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

router.post("/count-note", async (req, res) => {
  try {
    const { id } = req.query;
    const user = await User.findById(id);
    if (!user) throw new Error("user not found");

    user.note_count += 1;
    await user.save();
  } catch (err) {
    res.status(501).send({status: 'error', message: err.message });
  }
});

router.post("/reset-count-note", async (req, res) => {
  try {
    const user = await User.findById(req.body.id);
    if (!user) throw new Error("user not found");

    user.note_count = 0;
    await user.save();
  } catch (err) {
    res.status(501).send({status: 'error', message: err.message });
  }
});

module.exports = router;
