require("dotenv").config();
const localSecrets = require("./local-secrets.json");

const { mySQLdb } = require("./integrations");
const { secretsService } = require("./integrations");
//const auth = require('./routes/auth');

/* CATCH ALL UNHANDLED ERRORS */
process.on("uncaughtException", () => {});
/* CATCH ALL UNHANDLED ERRORS */

(async () => {
  const secretsData = localSecrets;
  global.secrets = secretsData;
  await mySQLdb.init(secretsData.db);

  const express = require("express");
  const app = express();

  // CORS
  const cors = require("cors");
  app.use(
    cors({
      origin: secretsData.prxcore_origin_url,
      credentials: true,
    })
  );

  const { cookieParser } = require("./utils");
  app.use(cookieParser.cookieParserInit(secretsData.cookie_secret));

  const { isAuthenticated } = require("./middlewares");

  const securityApp = require("./subapps/security-app");
  const coreApp = require("./subapps/core-app");

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  //app.use('/api/v1', auth);
  app.use("/api", securityApp);
  app.use("/api", [isAuthenticated],  [coreApp]);

  app.use("/health", (req, res) => {
    const x = Date();
    const a = "as";
    res.send({ status: x });
  });

  app.listen(process.env.PORT, () => {
    console.log(
      `Server up listening on ${process.env.PORT} - pid: ${process.pid}`
    );
  });
})();
