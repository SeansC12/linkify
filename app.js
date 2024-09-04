import express from "express";
import createHomeTemplate from "./views/index.js";
const app = express();
const port = 3000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send(createHomeTemplate());
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
