const express = require("express");
const { getIndex } = require("../controllers/whatsapp");

const router = express.Router();

router.route("/").get(getIndex);

module.exports = router;
