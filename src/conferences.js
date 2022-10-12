import express from "Express";
const router = express.Router();

import knex from "knex";

const db = knex({
  client: "mysql",
  connection: {
    host: "database-1.cluster-csuto9dkhygk.us-east-1.rds.amazonaws.com",
    port: 3306,
    user: "admin",
    password: "iWFrvRdCgg3Y9fMUkWojGf",
    database: "FootballTest",
  },
});

router.get("/", async (req, res) => {
  try {
    const conferences = await db.select().from("TestConferences");

    return res.send(conferences);
  } catch (error) {
    return res.send(error);
  }
});

router.get("/:conferenceId/teams", async (req, res) => {
  try {
    let { conferenceId } = req.params;
    conferenceId = parseInt(conferenceId);

    const teams = await db("TestTeams").where({
      conferenceId,
    });

    return res.send(teams);
  } catch (error) {
    return res.status(res?.statusCode || 500).send(error);
  }
});

export default router;
