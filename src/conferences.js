var express = require("express");
var router = express.Router();

const PAC_12_TEAMS = [
  {
    name: "Washington",
  },
  {
    name: "Colorado",
  },
];

const BIG_12_TEAMS = [
  {
    name: "Oklahoma State",
  },
  {
    name: "Baylor",
  },
];

router.get("/:conferenceId/teams", (req, res) => {
  const { conferenceId } = req.params;
  let teams;
  if (conferenceId == "pac12") {
    teams = PAC_12_TEAMS;
  } else {
    teams = BIG_12_TEAMS;
  }

  res.send(teams);
});
router.post("/", (req, res) => {
  res.send("POST route on things.");
});

//export this router to use in our index.js
module.exports = router;
