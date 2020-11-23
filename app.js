const express = require("express");
const mongoose = require("mongoose");
const Handlebars = require("handlebars");
const exphbs = require("express-handlebars");
const morgan = require("morgan");
const config = require("./config/config");
const bodyParser = require("body-parser");
const path = require("path");

const PORT = process.env.PORT || 3000;
//load mongoose
mongoose.connect(config.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
//set a DB connection

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to the database");
});

const app = express();

//allow bodyParser to recognize a body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//load public folder to front-end
app.use(express.static(path.join(__dirname, "public")));

//load and recognize body (own property issue)
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
//load handlebars and set .handlebars to .hbs
const hbs = exphbs.create({
  defaultLayout: "main",
  extname: ".hbs",
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  //create helper
  helpers: {},
});
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

//login request
app.use(morgan("dev"));

//routes
app.use("/", require("./routes/index"));

app.listen(PORT, () => console.log(`Server has started on: ${PORT}`));
