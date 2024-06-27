// Node.js common core global modules
const fs = require("fs");
const path = require("path");
const crc32 = require("crc/crc32");
const { format } = require("date-fns");
const myArgs = process.argv.slice(2);
const { v4: uuidv4 } = require("uuid");
const resolve = require("path");

// List of tokens
function tokenList() {
  if (DEBUG) console.log("token.tokenCount()");
  fs.readFile(__dirname + "/json/tokens.json", "utf-8", (error, data) => {
    if (error) throw error;
    let tokens = JSON.parse(data);
    console.log("** User List **");
    tokens.forEach((obj) => {
      console.log(" * " + obj.username + ": " + obj.token);
    });
  });
}

// Create a new token
function newToken(username) {
  if (DEBUG) console.log("token.newToken()");
  let newToken = JSON.parse(`{
      "created": "1969-01-31 12:30:00",
      "username": "username",
      "email": "user@example.com",
      "phone": "5556597890",
      "token": "token",
      "expires": "1969-02-03 12:30:00",
      "confirmed": "tbd"
  }`);
  //   console.log(newToken);

  let now = new Date();
  let expires = addDays(now, 3);

  newToken.created = `${format(now, "yyyy-MM-dd HH:mm:ss")}`;
  newToken.username = username;
  let random = uuidv4();
  newToken.token = crc32(username + random).toString(16);
  //   console.log(newToken.token);
  // newToken.token = crc32(username).toString(8);
  newToken.expires = `${format(expires, "yyyy-MM-dd HH:mm:ss")}`;
  console.log(newToken);

  fs.readFile(__dirname + "/json/tokens.json", "utf-8", (error, data) => {
    if (error) throw error;
    let tokens = JSON.parse(data);
    tokens.push(newToken);
    userTokens = JSON.stringify(tokens);

    fs.writeFile(__dirname + "/json/tokens.json", userTokens, (err) => {
      if (err) console.log(err);
      else {
        console.log(`New token ${newToken.token} was created for ${username}.`);
      }
    });
  });
  return newToken.token;
}

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function tokenApplication() {
  if (DEBUG) console.log("tokenApplication()");

  switch (myArgs[1]) {
    case "--count":
      if (DEBUG) console.log("--count");
      //     tokenCount();
      break;
    case "--list":
      if (DEBUG) console.log("--list");
      tokenList();
      break;
    case "--new":
      if (myArgs.length < 3) {
        console.log("invalid syntax. node myapp token --new [username]");
      } else {
        if (DEBUG) console.log("--new");
        newToken(myArgs[2]);
      }
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

const DATA_FILE = path.join(__dirname, "myApp/json/tokens.json");

function loadUsers(){
  if(fs.existsSync(DATA_FILE)){
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
  }
  return [];
};

function searchUserByEmail(email){
  const users = loadUsers();
  return users.find(user => user.email === email);
};

function searchUserByName(username){
  const users = loadUsers();
  return users.find(user => user.username === username);
}
function searchUserByPhone(phone){
  const users = loadUsers();
  return users.find(user => user.phone === phone);
}

const emailToSearch = "kyle@example.com";
const user = searchUserByEmail(emailToSearch);

if(user){
  console.log("user found!", user);
}else{
  console.log("user not found");
}
//save data to file
function saveData(data){
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
};
//add new user
function addUser(user){
  const data = loadUsers();
  data.push(user);
  saveData(data);
  console.log("Item Added");
}
//update user
function updateUser(username, updates){
  const data = loadUsers();
  const index = data.findIndex(item => item.username === username);
  if (index !== -1){
    if(updates.email){
      data[index].email = updates.email;
    }
    if(updates.phone){
      data[index].phone = updates.phone;
    }
    saveData(data);
    console.log("Item updated");
  } else{
    console.log("Item not found");
  }
}

const usernameToUpdate = "batman";
const updates = {email: "batman@google.com", phone: "120938019" }
updateUser(usernameToUpdate, updates);

module.exports = {
  tokenApplication,
  newToken,
  tokenList,
};
