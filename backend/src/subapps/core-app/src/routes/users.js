const express = require("express");
const router = express.Router();
const { usersService } = require("../services");

router.get("/users", async (req, res) => {
  res.send(await usersService.getUsers());
});

router.get("/users/project/:project_id", async (req, res) => {
  const { project_id } = req.params;
  res.send(await usersService.getUsersByProject(project_id));
});

router.get("/users/managers/:project_id", async (req, res) => {
  const { project_id } = req.params;
  res.send(await usersService.getManagers(project_id));
});

router.get("/users/reporters", async (req, res) => {
  res.send(await usersService.getReporters());
});

router.post("/users", async (req, res) => {
  res.send(await usersService.addUser(req.body));
});

router.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  res.send(await usersService.updateUser(req.body, id));
});

router.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  res.send(await usersService.deleteUser(id));
});

exports.usersRoutes = router;
