const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const { MessageMedia } = require("whatsapp-web.js");
const client = require("../utils/client");
const axios = require("axios");
const { phoneNumberFormatter } = require("../utils/formatter");
const checkRegisteredNumber = async function (number) {
  const isRegistered = await client.isRegisteredUser(number);
  return isRegistered;
};

exports.getIndex = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: "It's works!",
  });
});

// @desc        send text message
// @route       POST /api/v1/whatsapp/send-text-message
// @access      Public
exports.sendTextMessage = asyncHandler(async (req, res, next) => {
  const message = req.body.message;
  const number = phoneNumberFormatter(req.body.number);
  const isRegisteredNumber = await checkRegisteredNumber(number);

  if (!isRegisteredNumber) {
    return next(new ErrorResponse(`The number is not registered`, 500));
  }

  client
    .sendMessage(number, message)
    .then((response) => {
      res.status(200).json({
        status: true,
        response: response,
      });
    })
    .catch((err) => {
      return next(new ErrorResponse(err, 500));
    });
});

// @desc        Send message with media url
// @route       POST /api/v1/whatsapp/send-media-with-url
// @access      Public
exports.sendMediaWithUrl = asyncHandler(async (req, res, next) => {
  const message = req.body.message;
  const fileUrl = req.body.url;
  const number = phoneNumberFormatter(req.body.number);
  const isRegisteredNumber = await checkRegisteredNumber(number);

  if (!isRegisteredNumber) {
    return next(new ErrorResponse(`The number is not registered`, 500));
  }

  let mimetype;
  const attachment = await axios
    .get(fileUrl, {
      responseType: "arraybuffer",
    })
    .then((response) => {
      mimetype = response.headers["content-type"];
      return response.data.toString("base64");
    });

  const media = new MessageMedia(mimetype, attachment, "Media");

  client
    .sendMessage(number, media, {
      caption: message,
    })
    .then((response) => {
      res.status(200).json({
        status: true,
        response: response,
      });
    })
    .catch((err) => {
      return next(new ErrorResponse(err, 500));
    });
});
