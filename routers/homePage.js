const { Router } = require("express");
const Spaces = require("../models").space;

const router = new Router();

router.get("/", async (req, res) => {
  try {
    // const allSpaces = await Spaces.findAll({where:});
  } catch (error) {}
  res.send();
});

module.exports = router;
