const { Router } = require("express");
const Spaces = require("../models").space;
const User = require("../models").user;
const Stories = require("../models").story;
const authMiddleWare = require("../auth/middleware");

const router = new Router();

router.get("/", async (req, res) => {
  try {
    const allSpaces = await Spaces.findAll();

    res.send(allSpaces);
  } catch (error) {
    console.log(error);
  }
});

router.get("/mySpace", authMiddleWare, async (req, res) => {
  const current_user = req.user.id;
  try {
    // const spaceId = req.params.id;
    const spaceById = await Spaces.findOne({
      where: { userId: current_user },
      include: [
        {
          model: Stories,
        },
      ],
    });
    res.send(spaceById);
  } catch (error) {
    console.log(error);
  }
});

router.get("/mySpace/myStories", authMiddleWare, async (req, res, next) => {
  const current_user = req.user.id;
  try {
    const storyById = await Stories.findAll({
      where: { spaceId: current_user },
    });
    res.send(storyById);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/mySpace", authMiddleWare, async (req, res) => {
  try {
    const story = req.body;
    const newStory = await Stories.create({
      name: story.name,
      content: story.content,
      imageUrl: story.imageUrl,
    });

    res.send(newStory);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/mySpace", authMiddleWare, async (req, res) => {
  try {
    const id = req.body.id;
    await Stories.destroy({
      where: { id },
    }).then(() => {
      res.status(204).end();
    });
  } catch (error) {
    console.log(error);
  }
});

// router.get("/userSpace/:userId", async (req, res) => {
//   const current_user = req.params.userId
// })

router.get("/:id", async (req, res) => {
  try {
    const spaceId = req.params.id;
    const spaceById = await Spaces.findOne({
      where: { id: spaceId },
      include: [
        {
          model: Stories,
        },
      ],
    });
    res.send(spaceById);
  } catch (error) {
    console.log(error);
  }
});

// not needed the one above does this already
router.get("/stories/:id", async (req, res) => {
  try {
    const spaceId = req.params.id;
    const storiesById = await Stories.findAll({
      where: { spaceId },
      include: [
        {
          model: Spaces,
          where: { id: spaceId },
          right: true,
        },
      ],
    });
    res.send(storiesById);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
