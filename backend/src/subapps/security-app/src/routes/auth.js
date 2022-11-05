const express = require("express");
const router = express.Router();
const { authService } = require("../services");
const { cookieParser } = require("../../../../utils");

router.post("/login", async (req, res) => {
  const singInData = req.body;
  const userAuthentication = await authService.authenticateUser(singInData);
  const { data } = await authService.getUserPolicies(+userAuthentication.data.id);

  const userPolicies = data;
  userAuthentication.data.policies = userPolicies;
  return res
    .cookie(
      "userAuthentication",
      JSON.stringify(userAuthentication),
      cookieParser.cookieConfig
    )
    .send(userAuthentication);
});

router.get("/logout", async (req, res) => {
  res.cookie('userAuthentication', '', {
    maxAge: -1,
    httpOnly: true,
    sameSite: true,
  });

  return res.status(200).send({
    success: false,
    message: "Logout",
  });
});

router.get("/authenticated", async (req, res) => {
  if (!req.signedCookies?.userAuthentication) {
    return res.status(401).send({
      success: false,
      message: "Session has expired or you are not authenticated yet",
    });
  }
  
  return res
    .send({
      success: true,
      message: "User authenticated",
  });
});

exports.authRoutes = router;
