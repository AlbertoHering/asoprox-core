const express = require("express");
const router = express.Router();
const { statementsService } = require("../services");

router.get("/statements", async (req, res) => {
  res.send(await statementsService.getStatements());
});

router.get("/statements/summary", async (req, res) => {
  res.send(await statementsService.getSummary());
});

router.get("/statements/:statement_id", async (req, res) => {
  const { statement_id } = req.params;
  res.send(await statementsService.getStatement(statement_id));
});

router.post("/statements", async (req, res) => {
  res.send(await statementsService.addStatement(req.body));
});

router.put("/statements/:id", async (req, res) => {
  const { id } = req.params;
  res.send(await statementsService.updateStatement(req.body, id));
});

router.delete("/statements/:id", async (req, res) => {
  const { id } = req.params;
  res.send(await statementsService.deleteStatement(id));
});

exports.statementsRoutes = router;
