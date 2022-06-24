exports.isAuthenticated = (req, res, next) => {
  const authData = req.signedCookies.userAuthentication;

  try {
    if (!authData) {
      return res.status(401).send({
        success: false,
        message: "Session has expired or you are not authenticated yet",
      });
    }

    req.sessionData = authData;
    next();
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "Session has expired or you are not authenticated yet",
    });
  }
};
