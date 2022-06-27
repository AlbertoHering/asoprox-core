exports.authSQLQueries = {
  authenticateUser: "CALL getAuthenticateUser(?);",
  getUserPolicies: "CALL getUserPolicies(?);"
};
