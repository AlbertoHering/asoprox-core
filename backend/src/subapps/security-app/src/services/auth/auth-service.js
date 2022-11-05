const { authSQLQueries } = require("./auth-service.sql");
const { funcWrapper } = require("../../../../../utils");
const { mySQLdb } = require("../../../../../integrations");

exports.authenticateUser = async (user) => {
  const fn = async () => {
/*     const domain = user.email.substr(user.email.indexOf("@"));
    if (!["@encora.com"].includes(domain)) {
      funcWrapper.throwError(
        "Invalid account, it should be a Encora account",
        404
      );
    } */
    const params = [user.email];
    const authUser = await mySQLdb.query(
      authSQLQueries.authenticateUser,
      params
    );

    if (!authUser.length) {
      funcWrapper.throwError("Invalid user", 404);
    }
    return authUser[0][0];
  };
  return await funcWrapper.ExecFnAsync(
    fn,
    "User authenticated successfully",
    200
  );
};

exports.getUserPolicies = async (user_id) => {

  const fn = async () => {
    const userPolicies = await mySQLdb.query(authSQLQueries.getUserPolicies, [
      user_id
    ]);

    const userPoliciesToArray = userPolicies[0].map(function(obj){
      return obj.code;
    });

    return userPoliciesToArray;

  };
  return await funcWrapper.ExecFnAsync(
    fn,
    "User policies retrieved successfully",
    200
  );
};