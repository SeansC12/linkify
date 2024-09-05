import express from "express";
import { createClient } from "redis";
import createHomeTemplate from "./views/index.js";
import createSuccessCard from "./views/success.js";
import { randomUUID } from "node:crypto";

// Express setup
const app = express();
const port = 3000;
const WEBSITE_DOMAIN = "localhost:3000";
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static("public"));

// Redis Client setup
const client = createClient({
  password: "cPX6ODerLGB9b05IBkiNyXDXBIJ1bZU6",
  socket: {
    host: "redis-15599.c292.ap-southeast-1-1.ec2.redns.redis-cloud.com",
    port: 15599,
  },
});

(async () => await client.connect())();

app.get("/", async (req, res) => {
  res.send(createHomeTemplate());
});

app.post("/createShortenedUrl", async (req, res) => {
  try {
    const urlToDirect = req.body.urlToDirect;
    const shortenedUrl = `${WEBSITE_DOMAIN}/${req.body.shortenedUrlAlias}`;
    const url_uuid = `url:${randomUUID()}`;
    if (urlToDirect === "" || shortenedUrl === "") {
      throw "Invalid empty string";
    }

    client.on("error", (err) => {
      throw err;
    });

    await client.hSet(url_uuid, {
      urlToDirect: urlToDirect,
      shortenedUrl: shortenedUrl,
    });

    res.send(createSuccessCard(urlToDirect, shortenedUrl));
  } catch (err) {}
});

app.get("/:shortenedUrl", async (req, res) => {
  const shortenedUrl = req.params.shortenedUrl;
  const results = await client.ft.search(
    "idx:url",
    `@shortenedUrl:\"${shortenedUrl}\"`
  );
  if (results.documents[0].value.urlToDirect) {
    res.redirect(
      `https://${results.documents[0].value.urlToDirect}`
    );
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
