const express = require("express");
const {
  getIndex,
  sendTextMessage,
  sendMediaWithUrl,
} = require("../controllers/whatsapp");

const router = express.Router();

router.route("/").get(getIndex);
router.route("/send-text-message").post(sendTextMessage);
router.route("/send-media-with-url").post(sendMediaWithUrl);

module.exports = router;
