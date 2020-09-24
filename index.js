const fetch = require("node-fetch");

const API_URL = "";
const S3_URL = "";

exports.handler = async (event) => {
  const filePath = event.Records[0].s3.object.key;
  if (!filePath.split("/")[1] || !filePath.split("/")[2]) {
    console.log("it is invalid filePath - ", filePath);
    return;
  }

  const fileNo = filePath.split("/")[1];
  const fileName = filePath.split("/")[2];

  await fetch(API_URL + fileNo, {
    method: "POST",
    body: JSON.stringify({
      url: S3_URL + fileNo + "/" + fileName,
    }),
  });

  const response = {
    statusCode: 200,
    body: JSON.stringify("Hello from Lambda!"),
  };
  return response;
};
