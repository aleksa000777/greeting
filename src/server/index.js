const express = require("express");
const Cache = require("./cache.js");

const app = express();

app.use(express.static("dist"));

// TODO temp local cache, replace with Redis
const localCache = new Cache(20);

const getTimeZone = hours => {
  if (hours < 12) return 1;
  if (hours < 18) return 2;
  return 3;
};

// TODO temp api call
const apiCall = name =>
  new Promise((resolve, reject) => {
    // temp to test
    const date = new Date();
    const hours = date.getHours();
    const timeZone = getTimeZone(hours);
    let greeting = "";

    switch (timeZone) {
      case 1:
        greeting = "Good Morning";
        break;
      case 2:
        greeting = "Good Afternoon";
        break;
      default:
        greeting = "Good Evening";
    }

    resolve(`${greeting} ${name}`);
    console.log(reject);
    // fetch(`${URL}?name=${name}`)
    //   .then(response => response.json())
    //   .then(resolve)
    //   .catch(reject);
  });

app.get("/api", (req, res) => {
  const date = new Date();
  const hours = date.getHours();
  const timeZone = getTimeZone(hours);
  const { name } = req.query;
  const user = localCache.get(name);
  if (!user || (user && user.zone !== timeZone)) {
    apiCall(name)
      .then(response => {
        localCache.put(name, { zone: timeZone, data: response });
        res.send({ data: response });
      })
      .catch(console.error);
  } else {
    res.send({ data: user.data });
  }
});

app.listen(8080, () => console.log("Listening on port 8080!"));

module.exports = {
  app,
  apiCall,
  getTimeZone
};
