const express = require("express");
const bodyParser = require("body-parser");

const routes = require("./routes/index.route");

const PORT = process.env.PORT || 5001;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Hello World!"));
app.use(routes);

app.get("*", (req, res) => {
  res.status(404).json({ message: "Page does not exist" });
});

app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});
