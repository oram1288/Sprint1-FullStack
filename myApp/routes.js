const express = require("express");
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.listen(PORT, () => {
  console.log(`Simple app running on port ${PORT}.`);
});

app.get("/", (request, response) => {
  response.render("Home", { name: "Sprint 1", title: "HOME" });
});

app.use((request, response) => {
  response.status(404).render("fourohfour");
});
