import express from "Express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ errorFormat: "minimal" });

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

router.get("/", async (req, res) => {
  try {
    const conferences = await prisma.conference.findMany();

    return res.send(conferences);
  } catch (error) {
    return res.send(error);
  }
});

router.get("/:conferenceId/teams", async (req, res) => {
  let { conferenceId } = req.params;
  conferenceId = parseInt(conferenceId);

  const teams = await prisma.conference.findUniqueOrThrow({
    where: { id: conferenceId },
    include: {
      Team: true,
    },
  });

  return res.send(teams);
});
router.post("/", (req, res) => {
  res.send("POST route on things.");
});

//export this router to use in our index.js
export default router;
