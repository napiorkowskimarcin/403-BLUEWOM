const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  let data = await axios.get("http://api.nbp.pl/api/exchangerates/tables/a/");
  data = data.data[0].rates;

  res.render("list", {
    layout: "main",
    data,
  });
});

module.exports = router;
