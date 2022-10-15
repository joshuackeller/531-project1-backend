import express from "express";
const router = express.Router();

import knex from "knex";

const db = knex({
  client: "mysql",
  connection: {
    host: "database-1.cluster-csuto9dkhygk.us-east-1.rds.amazonaws.com",
    port: 3306,
    user: "admin",
    password: "iWFrvRdCgg3Y9fMUkWojGf",
    database: "CollegeFootballDB",
  },
});

// GET CONFERENCES
router.get("/", async (req, res) => {
  try {
    const conferences = await db.select().from("Conferences");

    return res.send(conferences);
  } catch (error) {
    return res.send(error);
  }
});

// GET TEAMS IN A CONFERENCE
router.get("/:conferenceId/teams", async (req, res) => {
  try {
    let { conferenceId } = req.params;
    conferenceId = parseInt(conferenceId);

    const conference = await db("Conferences").where({
      ConferenceId: conferenceId,
    });

    const teams = await db("Teams").where({
      ConferenceId: conferenceId,
    });

    return res.send({
      ...conference?.[0],
      teams,
    });
  } catch (error) {
    return res.status(res?.statusCode || 500).send(error);
  }
});

export default router;
