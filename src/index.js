import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
  res.status(200).send({ response: "Success" });
});

export default router;
