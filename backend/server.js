const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");

dotenv.config();

const link_database = process.env.DATABASE_LINK;
const secret_key = process.env.SECRET_KEY;

//------------Controllers Imports-----------------------
const logoutHandler = require("./controllers/logout");
const loginHandler = require("./controllers/login");
const registerHandler = require("./controllers/register");
const saveVisit = require("./controllers/visitSave");
const deleteVisit = require("./controllers/visitDelete");
const { getUserVisits, getAllVisits } = require("./controllers/visitGet");

//------------Middleware-----------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: secret_key,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 48 * 60 * 60 * 1000,
    },
  })
);

app.use(cookieParser(secret_key));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

//------------Database-----------------------
mongoose
  .connect(link_database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });

//---------------------Routes----------------------------
app.post("/login", loginHandler);
app.post("/register", registerHandler);
app.post("/logout", logoutHandler);
app.post("/visitSave", saveVisit);
app.post("/visitDelete", deleteVisit);
app.get("/visitGet", getUserVisits);    //do sprawdzenia
app.get("/visitGet", getAllVisits);     //do sprawdzenia
app.get("/user", (req, res) => {
  res.send(req.user);
}); 

app.listen(5000, () => {
  console.log(`Example app listening on port 5000`);
});
