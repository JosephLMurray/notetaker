const router = require("express").Router();

const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");

// GET Route for retrieving all the tips
router.get("/notes", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new UX/UI tip
router.post("/notes", (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json(`Note added successfully 🚀`);
  } else {
    res.error("Error in adding note");
  }
});

router.delete("/notes/:id", (req, res) => {
  let noteID = req.params.id;
  readFromFile("./db/db.json")
    .then((data) => {
      return JSON.parse(data);
    })
    .then((data) => {
      writeToFile(
        "./db/db.json",
        data.filter((note) => note.id !== noteID)
      );
      res.json(`Note deleted successfully 🚀`);
    });
});

module.exports = router;
