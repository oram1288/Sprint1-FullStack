const fs = require("fs");
const myArgs = process.argv.slice(2);

function displayConfig() {
  if (DEBUG) console.log("config.displayConfig()");
  let fileName = "/json/config.json";
  fs.readFile(__dirname + fileName, (error, data) => {
    if (error) throw error;
    console.log(JSON.parse(data));
  });
}

function configApplication() {
  if (DEBUG) console.log("configApplication()");

  switch (myArgs[1]) {
    case "--show":
      if (DEBUG) console.log("--show");
      displayConfig();
      break;
    case "--reset":
      if (DEBUG) console.log("--reset");
      break;
    case "--set":
      if (DEBUG) console.log("--set");
      break;
    case "--help":
    case "--h":
    default:
      fs.readFile(__dirname + "/help/usage.txt", (error, data) => {
        if (error) throw error;
        console.log(data.toString());
      });
  }
}

module.exports = {
  configApplication,
};
