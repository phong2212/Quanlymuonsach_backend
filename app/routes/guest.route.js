const express = require("express");
const guests = require("../controllers/guest.controller");

const router = express.Router();

router.route("/")
    .post(guests.create)

router.route("/:id")
    .get(guests.findOne)

module.exports = router;