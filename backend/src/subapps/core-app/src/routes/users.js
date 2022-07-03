const express = require("express");
const router = express.Router();
const { usersService } = require("../services");

router.get("/users/admins", async (req, res) => {
  res.send(await usersService.getTypes());
});

router.get("/users", async (req, res) => {
  res.send(await usersService.getUsers());
});

router.get("/users/list", async (req, res) => {
  res.send(await usersService.getUsersList());
});

router.get("/users/:user_id", async (req, res) => {
  const { user_id } = req.params;
  res.send(await usersService.getUser(user_id));
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
