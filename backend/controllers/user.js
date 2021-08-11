const User = require("../models/user");
const Role = require("../models/role");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  if (!req.body.email || !req.body.email || !req.body.password)
    return res.status(400).send("Process failed: Incomplete data");

  let existingEmail = await User.findOne({ email: req.body.email });
  if (existingEmail)
    return res.status(400).send("Procces failed: Email already register");

  let hash = await bcrypt.hash(req.body.password, 10);

  let role = await Role.findOne({ name: "user" });
  if (!role)
    return res.status(400).send("Procces Failed: No Role was assigned");

  let user = new User({
    name: req.body.name,
    email: req.body.name,
    password: hash,
    roleId: role._id,
    dbStatus: true,
  });

  let result = await user.save();
  if (!result) return res.status(400).send("Failed to register use");

  try {
    let jwt = user.generateJWT();
    return res.status(200).send({ jwt });
  } catch (e) {
    return res.status(400).send("Failed to register user");
  }
};

const listUser = async (req, res) => {
  let user = await User.find({ name: new RegExp(req.params["name"], "i") })
    .populate("roleId")
    .exec();
  if (!user || user.length === "") return res.status(400).send("No users");
  return res.status(200).send({ user });
};

module.exports = { registerUser, listUser };
