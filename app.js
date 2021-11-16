const morgan = require("morgan");
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const db = require("./db");
const session = require("express-session");
const globalRouter = require("./routers/globalRouter");
const boardRouter = require("./routers/boardRouter");

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(
  session({
    secret: "eunjin",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/", globalRouter);
app.use("/board", boardRouter);

app.set("view engine", "pug");
app.use(morgan(`dev`));
app.use("/assets", express.static(path.join(__dirname, "/assets")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`${PORT} server start`);
});
