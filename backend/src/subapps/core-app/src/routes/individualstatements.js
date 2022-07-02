const express = require("express");
const router = express.Router();
const { individualstatementsService } = require("../services");

router.get("/individualstatements/:individualstatement_id/:summary", async (req, res) => {
  const { individualstatement_id } = req.params;
  const { summary } = req.params;
  res.send(await individualstatementsService.getIndividualStatement(individualstatement_id, summary));
});

router.get("/individualstatements/date_range", async (req, res) => {
  res.send(await individualstatementsService.getDateRange());
});

router.post("/individualstatements", async (req, res) => {
  res.send(await individualstatementsService.addIndividualStatement(req.body));
});


router.put("/individualstatements/:id", async (req, res) => {
    res.send(await individualstatementsService.updateIndividualStatement(req.body));
});

router.delete("/individualstatements/:id", async (req, res) => {
  const { id } = req.params;
  res.send(await individualstatementsService.deleteIndividualStatement(id));
});

exports.individualstatementsRoutes = router;
