import express from "express";
const router = express.Router();

import knex from "knex";

//

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

// GET TEAM
router.get("/:teamId", async (req, res) => {
  try {
    let { teamId } = req.params;
    teamId = parseInt(teamId);

    const team = await db("Teams").where({
      TeamId: teamId,
    });

    let nextMatchup;
    let opposingTeam;
    try {
      nextMatchup = await db("WeeklyMatchups")
        .where("HomeTeam", teamId)
        .orWhere("AwayTeam", teamId);

      nextMatchup = nextMatchup?.[0];

      const opposingTeamId =
        nextMatchup.HomeTeam == teamId
          ? nextMatchup.AwayTeam
          : nextMatchup.HomeTeam;

      opposingTeam = await db("Teams").where({
        TeamId: opposingTeamId,
      });
    } catch (error) {
      console.log("No matchup found");
    }

    return res.send({
      nextMatchup: {
        opposingTeam: opposingTeam?.[0],
        ...nextMatchup,
      },
      ...team?.[0],
    });
  } catch (error) {
    return res.status(res?.statusCode || 500).send(error);
  }
});

export default router;
