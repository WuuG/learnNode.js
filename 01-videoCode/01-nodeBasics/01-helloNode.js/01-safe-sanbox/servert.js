const https = require("https");

https.get("https://attendance.keepdev.top/api/version", (res) => {
  let str = "";
  res.on("data", (chunk) => {
    str += chunk;
  });
  res.on("end", () => {
    console.log(str);
  });
});
