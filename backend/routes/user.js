const express = require("express");
const router = express.Router();
const UserController= require("../controllers/user");

router.post("/registerUser" , UserController.registerUser);
router.get("/listUser/:name?" , UserController.listUser);

module.exports = router;