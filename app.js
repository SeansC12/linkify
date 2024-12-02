import express from "express";

import { createClient } from "redis";
import cookieParser from "cookie-parser";
import { randomUUID } from "node:crypto";

import createHomePage from "./views/index.js";
import createMyLinkRow from "./views/MyLinks.js";
import createSuccessCard from "./views/Success.js";
import createErrorCard from "./views/Error.js";
import create404Page from "./views/404.js";
import { create } from "node:domain";

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

// FT.CREATE idx:url ON hash PREFIX 1 "url:" SCHEMA alias TEXT

(async () => {
  await client.connect();
})();

// GET /
app.get("/", async (req, res) => {
  res.send(createHomePage());
});

// GET /createShortenedUrl
app.post("/createShortenedUrl", async (req, res) => {
  console.log("createShortenedUrl hit");
  try {
    const urlToDirect = req.body.urlToDirect;
    const alias = req.body.shortenedUrlAlias;

    const isValidUrl = (url) => {
      try {
        new URL(url);
        return true;
      } catch (err) {
        return false;
      }
    };

    const isValidAlias = (alias) => {
      const aliasRegex = /^[a-zA-Z0-9-_]+$/;
      return aliasRegex.test(alias);
    };

    if (!isValidUrl(urlToDirect)) {
      throw "Invalid URL. Please enter a valid URL.";
    }

    if (!isValidAlias(alias)) {
      throw "Invalid alias. Please enter a valid alias.";
    }

    if (alias === "" || alias.length === 0) {
      throw "Invalid. Input field is empty.";
    }

    if (alias.length > 50 || urlToDirect.length > 2000) {
      throw "Invalid. Input field is too long.";
    }

    if (alias.length < 5) {
      throw "Invalid. Alias must be at least 5 characters.";
    }

    const shortenedUrl = `${WEBSITE_DOMAIN}/${alias}`;
    const url_uuid = `url:${randomUUID()}`;

    client.on("error", (err) => {
      throw err;
    });

    const results = await client.ft.search("idx:url", `(@alias:'${alias}')`);

    if (results.documents[0]) {
      res.status(400).send(createErrorCard("This alias is already taken. Please try another one."));
      return;
    }

    await client.hSet(url_uuid, {
      urlToDirect: urlToDirect,
      alias: alias,
      visits: 0,
    });

    const successMessage = `URL shortened successfully! Your shortened URL is: <a href="${shortenedUrl}">${shortenedUrl}</a>`;
    res.send(createSuccessCard(successMessage));
  } catch (err) {
    res.status(400).send(createErrorCard(err));
  }
});

// GET /retrieveMyLinks
app.get("/retrieveMyLinks", async (req, res) => {
  const links = req.cookies;
  if (!links.shortenedUrlAlias) {
    res.send("You have no shortened links.");
    return;
  }

  const aliases = links.shortenedUrlAlias.split(",");

  let returnHTML = "";

  // try {
  //   const results = await client.ft.search("idx:url", `@alias:${aliases[8]}`);
  //   console.log(aliases, results);
  // } catch (err) {
  //   console.log(err);
  // }
  // res.send("Ok");

  for (const alias of aliases) {
    let results;
    try {
      results = await client.ft.search("idx:url", `@alias:\"${alias}\"`);
    } catch (err) {
      console.log("here");
      res.status(400).send("Something went wrong. Please try again.");
      return;
    }

    if (!results.documents[0]) {
      res.send("This link does not exist. Something went wrong. Please try again.");
      return;
    }

    const urlToDirect = results.documents[0].value.urlToDirect;

    const visits = results.documents[0].value.visits;

    returnHTML += createMyLinkRow(alias, urlToDirect, visits);
  }

  res.send(returnHTML);
});

// GET /:shortenedUrl
app.get("/:shortenedUrl", async (req, res) => {
  const shortenedUrl = req.params.shortenedUrl;

  // Search for the URL in Redis
  const results = await client.ft.search("idx:url", `@alias:\"${shortenedUrl}\"`);
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
