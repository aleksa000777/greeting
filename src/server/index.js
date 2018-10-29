const express = require("express");
const Cache = require("./cache.js");

const app = express();

app.use(express.static("dist"));

// TODO temp local cache, replace with Redis
const localCache = new Cache(20);

// temp func replace with server call
const getTimeZone = hours => {
  if (hours < 12) return "Good Morning";
  if (hours < 18) return "Good Afternoon";
  return "Good Evening";
};

app.get("/api", (req, res) => {
  const date = new Date();
  const hours = date.getHours();
  const timeZone = getTimeZone(hours);
  const user = localCache.get(req.query.name);
  if (user !== timeZone) {
    localCache.put(req.query.name, timeZone);
  }
  res.send({ data: `${timeZone} ${req.query.name}!` });
});

app.listen(8080, () => console.log("Listening on port 8080!"));
