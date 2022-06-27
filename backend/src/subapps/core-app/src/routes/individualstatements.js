const express = require("express");
const router = express.Router();
const { individualstatementsService } = require("../services");

router.get("/individualstatements/:individualstatement_id", async (req, res) => {
  const { individualstatement_id } = req.params;
  res.send(await individualstatementsService.getIndividualStatement(individualstatement_id));
});

router.post("/individualstatements", async (req, res) => {
  res.send(await individualstatementsService.addIndividualStatement(req.body));
});

router.put("/individualstatements/:id", async (req, res) => {
  const { id } = req.params;
  res.send(await individualstatementsService.updateIndividualStatement(req.body, id));
});

router.delete("/individualstatements/:id", async (req, res) => {
  const { id } = req.params;
  res.send(await individualstatementsService.deleteIndividualStatement(id));
});

exports.individualstatementsRoutes = router;
