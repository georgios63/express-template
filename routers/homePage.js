const { Router } = require("express");
const Spaces = require("../models").space;
const User = require("../models").user;
const Stories = require("../models").story;

const router = new Router();

router.get("/", async (req, res) => {
  try {
    const allSpaces = await Spaces.findAll();

    res.send(allSpaces);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const spaceId = req.params.id;
    const storiesById = await Stories.findAll({
      include: [{ model: Spaces, where: { id: spaceId }, right: true }],
    });

    res.send(storiesById);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
