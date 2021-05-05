const fs = require("fs");

fs.writeFile("./log.txt", "hello", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log("creat file");
  }
});
