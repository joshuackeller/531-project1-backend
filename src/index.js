import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
  res.status(200).send({ response: "HUGE DUB FOR THE FIRE NATION" });
});

export default router;
