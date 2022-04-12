const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Bootcamp = require("../models/Bootcamps");

exports.getIndex = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: process.env.URL_ENDPOINT,
  });
});
