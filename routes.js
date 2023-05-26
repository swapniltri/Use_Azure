const express = require("express");
const router = express.Router();

const control = require("./controller/control");

router.get("/",control.home);
router.get("/entry",control.entry);
router.post("/login",control.login);
router.post("/signup",control.signup);

module.exports = router;