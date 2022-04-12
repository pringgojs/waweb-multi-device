const axios = require("axios");
const https = require("https");

const postData = async function (number, message) {
  // var myJson = JSON.stringify(message);
  const data = {
    number: number,
    message: message,
  };
  var myJson = JSON.stringify(data);
  return axios({
    method: "post",
    url: process.env.URL_ENDPOINT,
    data: myJson,
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  })
    .then((res) => {
      // console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return err.data;
    });
};

module.exports = {
  postData,
};
