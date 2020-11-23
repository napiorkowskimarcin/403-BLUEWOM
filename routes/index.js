const express = require("express");
const router = express.Router();
// const { model } = require("mongoose");
// const Array = require("../models/Array");
// const axios = require("axios");

router.get("/", async (req, res) => {
  res.render("index", {
    layout: "main",
  });
});

module.exports = router;
