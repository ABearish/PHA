const express = require("express");
const app = express();

const cors = require('cors');
app.use(cors());

const path = require("path");
app.use(express.static(path.join(__dirname, "../public")));

const parser = require("body-parser");
app.use(parser.json());

const routes = require("./routes");
app.use("/", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`LISTENING TO PORT ${PORT}`);
});
