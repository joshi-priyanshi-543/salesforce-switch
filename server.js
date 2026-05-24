require("dotenv").config();

const express = require("express");
const cors = require("cors");
const jsforce = require("jsforce");

const app = express();

app.use(cors());
app.use(express.json());

const conn = new jsforce.Connection({
  oauth2: {
    loginUrl: process.env.LOGIN_URL,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI
  }
});

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});