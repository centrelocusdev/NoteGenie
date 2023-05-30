const router = require("express").Router();
const User = require("./userModal");
const bcrypt = require("bcrypt");

//get user by token
router.get("/user/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const user = await User.findOne({ token });
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

//signup
router.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.generateAuthToken();
    console.log(user);
    // await user.save();
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found, please try again");

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      throw new Error("Incorrect password, please try again");
    else {
      await user.generateAuthToken();
      res.status(200).send(user);
    }
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

//update
router.post("/update-profile", async (req, res) => {
  try {
    const { id } = req.query;
    const user = await User.findOne({ id });
    if (!user) throw new Error("user not found");

    const fieldsToBeUpdated = ["name", "email", "password"];
    const fields = Object.keys(req.body);

    fieldsToBeUpdated.map((f, i) => {
      if (fields.includes(fieldsToBeUpdated[i])) {
        user[f] = req.body[f];
      }
    });
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

//logout
router.post("/logout", async (req, res) => {
  try {
    const user = req.user;
    user.tokens = user.tokens.filter((token) => token != req.token);
    await user.save();
    res.send({ msg: "logged out successfully", user });
  } catch (err) {
    res.status(400).send({ err: err.message });
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

module.exports = router;
