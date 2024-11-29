import express from "express";

import { createClient } from "redis";
import cookieParser from "cookie-parser";
import { randomUUID } from "node:crypto";

import createHomePage from "./views/index.js";
import createSuccessCard from "./views/success.js";
import createErrorCard from "./views/error.js";
import create404Page from "./views/404.js";

// Express setup
const app = express();
const port = 3000;
const WEBSITE_DOMAIN = "localhost:3000";
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static("public"));
app.use(cookieParser());

// Redis Client setup
const client = createClient({
  password: "zWNBc9L1QFDDiz1N88QmdX5aQWNF66RU",
  socket: {
    host: "redis-15087.c292.ap-southeast-1-1.ec2.redns.redis-cloud.com",
    port: 15087,
  },
});

// FT.CREATE idx:url ON hash PREFIX 1 "url:" SCHEMA shortenedUrl TEXT

(async () => {
  await client.connect();
})();

app.get("/", async (req, res) => {
  res.send(createHomePage());
});

app.post("/createShortenedUrl", async (req, res) => {
  try {
    const urlToDirect = req.body.urlToDirect;
    const shortenedUrlAlias = req.body.shortenedUrlAlias;

    if (urlToDirect === "" || shortenedUrlAlias === "") {
      throw "Invalid. Input field is empty.";
    }

    const shortenedUrl = `${WEBSITE_DOMAIN}/${req.body.shortenedUrlAlias}`;
    const url_uuid = `url:${randomUUID()}`;

    client.on("error", (err) => {
      throw err;
    });

    await client.hSet(url_uuid, {
      urlToDirect: urlToDirect,
      shortenedUrl: shortenedUrl,
      visits: 0,
    });

    res.send(createSuccessCard(urlToDirect, shortenedUrl));
  } catch (err) {
    res.send(createErrorCard(err));
  }
});

app.get("/retrieveMyLinks", async (req, res) => {
  console.log("polled");
  const links = req.cookies;

  if (!links.shortenedUrlAlias) {
    res.send("You have no shortened links.");
    return;
  }

  const aliases = links.shortenedUrlAlias.split(";");

  for (const alias of aliases) {
    const results = await client.ft.search("idx:url", `@shortenedUrl:\"${alias}\"`);

    if (!results.documents[0]) {
      res.send("This link does not exist. Something went wrong. Please try again.");
      return;
    }

    const urlToDirect = results.documents[0].value.urlToDirect;
    console.log(results.documents[0]);
    const visits = results.documents[0].value.visits;

    res.send(`<div>${alias} --> ${urlToDirect} - ${visits} visits</div>`);
  }
});

app.get("/:shortenedUrl", async (req, res) => {
  const shortenedUrl = req.params.shortenedUrl;

  // Search for the URL in Redis
  const results = await client.ft.search("idx:url", `@shortenedUrl:\"${shortenedUrl}\"`);
  if (results.documents[0]) {
    // Fix the URL if it doesn't have a protocol
    let url = results.documents[0].value.urlToDirect;
    const urlProtocols = ["http://", "https://"];

    if (
      url.substring(0, urlProtocols[0].length) !== urlProtocols[0] &&
      url.substring(0, urlProtocols[1].length) !== urlProtocols[1]
    ) {
      url = urlProtocols[1] + url;
    }

    res.redirect(url);

    // Adds one visit to this URL in Redis
    const url_uuid = results.documents[0].id;

    await client.hIncrBy(url_uuid, "visits", 1);
  } else {
    res.send(create404Page());
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
